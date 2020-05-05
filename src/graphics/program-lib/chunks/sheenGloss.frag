#ifdef MAPFLOAT
uniform float material_sheenGlossiness;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_sheenGlossMap;
#endif

void getSheenGloss() {
    sheenGlossiness = 1.0;

    #ifdef MAPFLOAT
        sheenGlossiness *= material_sheenGlossiness;
    #endif

    #ifdef MAPTEXTURE
        sheenGlossiness *= texture2D(texture_sheenGlossMap, $UV).$CH;
    #endif

    #ifdef MAPVERTEX
        sheenGlossiness *= saturate(vVertexColor.$VC);
    #endif

    sheenGlossiness *= sheenGlossiness;
}

