uniform float material_reflectivity;
#ifdef CLEARCOAT
    uniform float material_clearCoatReflectivity;
#endif
void addReflection() {
    dReflection += calcReflection(dReflDirW, dGlossiness, material_reflectivity);
    #ifdef CLEARCOAT
        ccReflection += calcReflection(ccReflDirW, ccGlossiness, material_clearCoatReflectivity);
    #endif
    #ifdef SHEEN
        sheenReflection += calcReflection(dReflDirW, sheenGlossiness, 1.0);
    #endif
}

