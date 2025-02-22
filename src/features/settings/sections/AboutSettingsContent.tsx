import Image from "next/image";

import packageVersion from "@/root/package.json";

const appVersion = packageVersion.version;

export function AboutSettingsContent() {
    return (
        <div className="flex flex-col items-center gap-4">
            <Image src={"/android-chrome-512x512.png"} alt="logo" width={128} height={128} />
            <strong className="text-xl">Easy Start</strong>
            <div className="flex flex-col items-center">
                <span className="text-zinc-400">Version</span>
                <span>{appVersion}</span>
            </div>
        </div>
    );
}
