"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserPreferences = {
    openLinksInNewTab: boolean;
    weatherCity: string;
};

type UserPreferencesStore = {
    userPreferences: UserPreferences;
    toggleOpenLinksInNewTab: (val: boolean) => void;
    setWeatherCity: (val: string) => void;
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
    persist(
        (set) => ({
            userPreferences: {
                openLinksInNewTab: true,
                weatherCity: "Mumbai",
            },
            toggleOpenLinksInNewTab: (val) =>
                set((state) => ({
                    userPreferences: {
                        ...state.userPreferences,
                        openLinksInNewTab: val,
                    },
                })),
            setWeatherCity: (val) =>
                set((state) => ({
                    userPreferences: {
                        ...state.userPreferences,
                        weatherCity: val,
                    },
                })),
        }),
        {
            name: "user-preferences",
        },
    ),
);
