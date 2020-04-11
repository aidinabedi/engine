#ifdef MAPFLOAT
uniform float material_sheenGlossiness;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_sheenGlossMap;
#endif

void getSheenGloss() {
    dSheenGloss = 1.0;

    #ifdef MAPFLOAT
        dSheenGloss *= material_sheenGlossiness;
    #endif

    #ifdef MAPTEXTURE
        dSheenGloss *= texture2D(texture_sheenGlossMap, $UV).$CH;
    #endif

    #ifdef MAPVERTEX
        dSheenGloss *= saturate(vVertexColor.$VC);
    #endif
}

