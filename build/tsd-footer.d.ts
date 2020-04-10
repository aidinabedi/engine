declare namespace pc {
    interface ScriptComponent {
        /**
         * @description Get a script instance (if attached).
         * @param type - The type of {@link pc.ScriptType}.
         * @returns If script is attached, the instance is returned. Otherwise null is returned.
         */
        get<T extends pc.ScriptType>(type: { new(): T }): T | null;
    }
}

export = pc;
