"use client";

import React, { ReactNode, useCallback, useRef } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    UniqueIdentifier,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TDraggableItem<T> = T & {
    id: UniqueIdentifier;
};

export function DraggableContainer<T>({
    items,
    onChange,
    children,
}: {
    items: TDraggableItem<T>[];
    onChange: (items: TDraggableItem<T>[]) => void;
    children: ReactNode;
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            const newNotes = arrayMove(items, oldIndex, newIndex);

            onChange(newNotes as never);
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
}

export function DraggableItem({
    id,
    children,
    enabledReorder = true,
}: {
    id: UniqueIdentifier;
    children: ReactNode;
    enabledReorder?: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
        useSortable({
            id,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const dragStartRef = useRef<boolean>(false);

    const handleMouseDown = useCallback(() => {
        dragStartRef.current = false;
    }, []);

    const handleMouseMove = useCallback(() => {
        dragStartRef.current = true;
    }, []);

    const handleMouseUp = useCallback(
        (e: React.MouseEvent) => {
            if (dragStartRef.current || isDragging || isSorting) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        },
        [isDragging, isSorting],
    );

    if (!enabledReorder) return <>{children}</>;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            {children}
        </div>
    );
}
