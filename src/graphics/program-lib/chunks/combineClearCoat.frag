vec3 combineClearCoat() {
    return ccSpecularLight*ccSpecularity+ccReflection.rgb*ccSpecularity*ccReflection.a;
}
