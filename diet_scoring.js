function calculateDietScore(answers) {
    // Kasvikset, marjat ja hedelmät (0-20 points)
    const kasviksetMarjatHedelmit = scoreKasviksetMarjatHedelmit(answers);
    if (!Number.isFinite(kasviksetMarjatHedelmit)) console.log(kasviksetMarjatHedelmit);
    // Tarkastettu mutta lopullinen pisteytys on epäselvä
    // Kasvis-, kala- ja liharuoka (0-10 points)
    const kasvisKalaLiha = scoreKasvisKalaLiha(answers);
    if (!Number.isFinite(kasvisKalaLiha)) console.log(kasvisKalaLiha);
    // kasviskalliha on laskettu
    // Viljavalmisteet ja peruna (0-20 points)
    const viljavalmisteetPeruna = scoreViljavalmisteetPeruna(answers);
    if (!Number.isFinite(viljavalmisteetPeruna)) console.log(viljavalmisteetPeruna);
    // Rasvan laatu / pehmeä rasva (0-15 points)
    const rasvanLaatu = scoreRasvanLaatu(answers);
    if (!Number.isFinite(rasvanLaatu)) console.log(rasvanLaatu);
    // rasvanlaatu on tarkastettu
    
    // Naposteltavat ja juomat (0-15 points)
    const naposteltavatJuomat = scoreNaposteltavatJuomat(answers);
    if (!Number.isFinite(naposteltavatJuomat)) console.log(naposteltavatJuomat);
    // Naposteltavat laskettu
    
    // Maitovalmisteet ja kasvipohjaiset vaihtoehdot (0-10 points)
    const maitovalmisteet = scoreMaitovalmisteet(answers);
    if (!Number.isFinite(maitovalmisteet)) console.log(maitovalmisteet);
    // Maitovalmisteet laskettu

    // Ateriarytmi (0-10 points)
    const ateriarytmi = scoreAteriarytmi(answers);
    if (!Number.isFinite(ateriarytmi)) console.log(ateriarytmi);
    
    // Calculate total
    const total = kasvisKalaLiha + viljavalmisteetPeruna + rasvanLaatu + 
                  kasviksetMarjatHedelmit + naposteltavatJuomat + 
                  maitovalmisteet + ateriarytmi;
    
    return {
        total: Math.min(total, 100), // Max 100 points
        breakdown: {
            kasvisKalaLiha: kasvisKalaLiha,
            viljavalmisteetPeruna: viljavalmisteetPeruna,
            rasvanLaatu: rasvanLaatu,
            kasviksetMarjatHedelmit: kasviksetMarjatHedelmit,
            naposteltavatJuomat: naposteltavatJuomat,
            maitovalmisteet: maitovalmisteet,
            ateriarytmi: ateriarytmi
        }
    };
}

// 1. Kasvis-, kala- ja liharuoka (0-10 points)
function scoreKasvisKalaLiha(answers) {
    // Kasvisruoka (question 8)
    const kasvis = scoreQuestion8(answers);
    if (!Number.isFinite(kasvis)) console.log(kasvis);
    //console.log("Kasvis pisteet")
    //console.log(kasvis)
    // Kalaruoka (question 9)
    const kala = scoreQuestion9(answers);
    if (!Number.isFinite(kala)) console.log(kala);
    //console.log("Kala pisteet")
    //console.log(kala)
    const palkokasvi = scoreQuestion23(answers)
    if (!Number.isFinite(palkokasvi)) console.log(palkokasvi);
    //console.log("Palkokasvi pisteet")
    //console.log(palkokasvi)
    // Kananmuna (question 31)
    const kananmuna = scoreQuestion31(answers);
    if (!Number.isFinite(kananmuna)) console.log(kananmuna);
    //console.log("Kananmuna pisteet")
    //console.log(kananmuna)
    // Lihaindeksi
    const liha = scoreLihaindeksi(answers);
    if (!Number.isFinite(liha)) console.log(liha);
    //console.log("Liha pisteet")
    //console.log(liha)
    // Calculate final score (kasvis + kala + kananmuna + liha_index)
    let total = kasvis + kala + kananmuna + liha + palkokasvi;
    // Ensure max 10 points
    return total
    //return Math.min(total, 10);
}

// Kasvisruoka scoring (question 8)
function scoreQuestion8(answers) {
    const answer = answers["8. Kuinka usein syöt kasvisruokia?"];
    const points = {
        "7 kertaa viikossa tai useammin": 2,
        "4–6 kertaa viikossa": 2,
        "2–3 kertaa viikossa": 1,
        "kerran viikossa": 1,
        "1–3 kertaa kuukaudessa": 0,
        "Harvemmin kuin kerran kuukaudessa": 0,
        "En syö kasvisruokia": 0
    };
    return points[answer];
}

// Kalaruoka scoring (question 9)
function scoreQuestion9(answers) {
    const answer = answers["9. Kuinka usein syöt kalaruokia?"];
    const points = {
        "7 kertaa viikossa tai useammin": 2,
        "4–6 kertaa viikossa": 2,
        "2–3 kertaa viikossa": 2,
        "kerran viikossa": 1,
        "1–3 kertaa kuukaudessa": 0,
        "Harvemmin kuin kerran kuukaudessa": 0,
        "En syö kalaruokia": 0
    };
    return points[answer];
}

// Kalaruoka scoring (question 9)
function scoreQuestion23(answers) {
    const answer = answers["23. Kuinka paljon syöt palkokasveja ja niistä tehtyjä valmisteita?"];
    const points = {
        "2 annosta päivässä tai enemmän": 2,
        "1 annoksen päivässä": 2,
        "4–6 annosta viikossa": 2,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    return points[answer];
}


// Kananmuna scoring (question 31)
function scoreQuestion31(answers) {
    const answer = answers["31. Kuinka paljon syöt kananmunia?"];
    const points = {
        "2 annosta päivässä tai enemmän": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 1,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin 1 annoksen viikossa": 1,
        "En syö kananmunia": 1,
    };
    return points[answer];
}

// Lihaindeksi scoring
function scoreLihaindeksi(answers) {
    // Liharuoka (question 11)
    const liharuoka = scoreQuestion11(answers);
    if (!Number.isFinite(liharuoka)) console.log(liharuoka);
    
    // Makkararuoka (question 12)
    const makkararuoka = scoreQuestion12(answers);
    if (!Number.isFinite(makkararuoka)) console.log(makkararuoka);
    
    // Lihaleikkeleet (question 29)
    const lihaleikkeleet = scoreQuestion29(answers);
    if (!Number.isFinite(lihaleikkeleet)) console.log(lihaleikkeleet);
    
    // Leikkelemakkara (question 30)
    const leikkelemakkara = scoreQuestion30(answers);
    if (!Number.isFinite(leikkelemakkara)) console.log(leikkelemakkara);

    // Sum all points
    let total = liharuoka + makkararuoka + lihaleikkeleet + leikkelemakkara;
    

    // Convert to index points based on scoring rules
    if (total >= 7) return 3;
    else if (total >= 5) return 2;
    else if (total >= 3) return 1;
    else if (total >= 0) return 0;
    else return "aaaaaaaaaaaaaaaaaaa";
    
    //return Math.min(total, 3);
}

// Liharuoka scoring (question 11)
function scoreQuestion11(answers) {
    const answer = answers["11. Kuinka usein syöt liharuokia?"];
    const points = {
        "7 kertaa viikossa tai useammin": 0,
        "4–6 kertaa viikossa": 0,
        "2–3 kertaa viikossa": 1,
        "kerran viikossa": 2,
        "1–3 kertaa kuukaudessa": 2,
        "Harvemmin kuin kerran kuukaudessa": 2,
        "En syö liharuokia": 2
    };
    return points[answer];
}

// Makkararuoka scoring (question 12)
function scoreQuestion12(answers) {
    const answer = answers["12. Kuinka usein syöt makkararuokia?"];
    const points = {
        "7 kertaa viikossa tai useammin": 0,
        "4–6 kertaa viikossa": 0,
        "2–3 kertaa viikossa": 0,
        "kerran viikossa": 1,
        "1–3 kertaa kuukaudessa": 1,
        "Harvemmin kuin kerran kuukaudessa": 2,
        "En syö makkararuokia": 2
    };
    return points[answer];
}

// Lihaleikkeleet scoring (question 29)
function scoreQuestion29(answers) {
    const answer = answers["29. Kuinka paljon syöt lihaleikkeleitä?"];
    const points = {
        "4 annosta päivässä tai enemmän": 0,
        "2–3 annosta päivässä": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 1,
        "1–3 annosta viikossa": 2,
        "Vähemmän kuin 1 annoksen viikossa": 2,
        "En syö lihaleikkeleitä": 2
    };
    return points[answer];
}

// Leikkelemakkara scoring (question 30)
function scoreQuestion30(answers) {
    const answer = answers["30. Kuinka paljon syöt leikkelemakkaraa?"];
    const points = {
        "5 annosta päivässä tai enemmän": 0,
        "3–4 annosta päivässä": 0,
        "2 annosta päivässä": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 1,
        "1–3 annosta viikossa": 2,
        "Vähemmän kuin 1 annoksen viikossa": 2,
        "En syö leikkelemakkaraa": 2
    };
    return points[answer];
}

// 2. Viljavalmisteet ja peruna (0-20 points)
function scoreViljavalmisteetPeruna(answers) {
    // Täysjyvävilja (0-17 points)
    const taysjyva = scoreTaysjyvaVilja(answers);
    if (!Number.isFinite(taysjyva)) console.log(taysjyva);
    
    // Vähäkuituiset viljavalmisteet (0-2 points)
    const vahakuituiset = scoreVahakuituiset(answers);
    if (!Number.isFinite(vahakuituiset)) console.log(vahakuituiset);
    
    // Peruna (0-1 point)
    const peruna = scorePeruna(answers);
    if (!Number.isFinite(peruna)) console.log(peruna);
    total = taysjyva + vahakuituiset + peruna;
    return total;
}

// Täysjyvävilja scoring
function scoreTaysjyvaVilja(answers) {
    
    // Calculate grams per day
    const ruisleipa = scoreQuestion25(answers); //getAnnos(answers["25. Kuinka paljon syöt ruisleipää tai sataprosenttista kauraleipää?"]);
    if (!Number.isFinite(ruisleipa)) console.log(ruisleipa);

    const muu_runsaskuituinen = scoreQuestion26(answers); //getAnnos(answers["26. Kuinka paljon syöt muuta runsaskuituista leipää?"]);
    if (!Number.isFinite(muu_runsaskuituinen)) console.log(muu_runsaskuituinen);

    const puuro_mysli_murot = scoreQuestion27(answers); //getAnnos(answers["27. Kuinka paljon syöt puuroa, runsaskuituisia myslejä tai muroja?"]);
    if (!Number.isFinite(puuro_mysli_murot)) console.log(puuro_mysli_murot);

    const taysjyva_pasta = scoreQuestion18(answers); //getAnnos(answers["18. Kuinka paljon syöt täysjyväpastaa tai muita täysjyväisiä lisukkeita?"]);
    if (!Number.isFinite(taysjyva_pasta)) console.log(taysjyva_pasta);

    //console.log(ruisleipa);
    //console.log(muu_runsaskuituinen);
    //console.log(puuro_mysli_murot);
    //console.log(taysjyva_pasta);
    // Calculate grams
    const total_grams = (ruisleipa * 15) + (muu_runsaskuituinen * 8) + (puuro_mysli_murot * 20) + (taysjyva_pasta * 25);
    //console.log("Total grams")
    //console.log(total_grams)
    // Score based on grams
    if (total_grams < 8) return 0;
    else if (total_grams < 20) return 2;
    else if (total_grams < 30) return 4;
    else if (total_grams < 40) return 6;
    else if (total_grams < 50) return 8;
    else if (total_grams < 60) return 10;
    else if (total_grams < 70) return 12;
    else if (total_grams < 80) return 14;
    else if (total_grams < 90) return 16;
    else if (total_grams < 90001) return 17;
    else return "aaaaaaaaaaaaaaaaa";
}


function scoreQuestion25(answers) {
    const answer = answers["25. Kuinka paljon syöt ruisleipää tai sataprosenttista kauraleipää?"];
    const points = {
        "6 annosta päivässä tai enemmän": 6,
        "4–5 annosta päivässä": 4.5,
        "2–3 annosta päivässä": 2.5,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}

function scoreQuestion26(answers) {
    const answer = answers["26. Kuinka paljon syöt muuta runsaskuituista leipää?"];
    const points = {
        "6 annosta päivässä tai enemmän": 6,
        "4–5 annosta päivässä": 4.5,
        "2–3 annosta päivässä": 2.5,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}

function scoreQuestion27(answers) {
    const answer = answers["27. Kuinka paljon syöt puuroa, runsaskuituisia myslejä tai muroja?"];
    const points = {
        "6 annosta päivässä tai enemmän": 6,
        "4–5 annosta päivässä": 4.5,
        "2–3 annosta päivässä": 2.5,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}

function scoreQuestion18(answers) {
    const answer = answers["18. Kuinka paljon syöt täysjyväpastaa tai muita täysjyväisiä lisukkeita?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4,
        "3 annosta päivässä": 3,
        "2 annosta päivässä": 2,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}

// Vähäkuituiset viljavalmisteet scoring
function scoreVahakuituiset(answers) {
    
    // Calculate total annos
    const vahakuituiset_leipä_pulla_murot = scoreQuestion28(answers); // getAnnos(answers["28. Kuinka paljon syöt vähäkuituista leipää, pullaa tai muroja?"]);
    if (!Number.isFinite(vahakuituiset_leipä_pulla_murot)) console.log(vahakuituiset_leipä_pulla_murot);

    const tavallinen_pasta = scoreQuestion19(answers); // getAnnos(answers["19. Kuinka paljon syöt tavallista pastaa tai viljalisukkeita?"]);
    if (!Number.isFinite(tavallinen_pasta)) console.log(tavallinen_pasta);
    //console.log(vahakuituiset_leipä_pulla_murot)
    //console.log(tavallinen_pasta)
    const total_annos = vahakuituiset_leipä_pulla_murot + tavallinen_pasta;
    // Score based on annos
    if (total_annos <= 1.0) return 2;
    else if (total_annos <= 3.0) return 1;
    else if (total_annos <= 9001)return 0;
    else return "aaaaaaaaaaaaaaaaaaaaaaaa"
}

function scoreQuestion28(answers) {
    const answer = answers["28. Kuinka paljon syöt vähäkuituista leipää, pullaa tai muroja?"];
    const points = {
        "6 annosta päivässä tai enemmän": 6,
        "4–5 annosta päivässä": 4.5,
        "2–3 annosta päivässä": 2.5,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}

function scoreQuestion19(answers) {
    const answer = answers["19. Kuinka paljon syöt tavallista pastaa tai viljalisukkeita?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4,
        "3 annosta päivässä": 3,
        "2 annosta päivässä": 2,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    
    return points[answer];
}


// Peruna scoring
function scorePeruna(answers) {
    const answer = answers["17. Kuinka paljon syöt perunaa?"];
    const points = {
        "4 annosta päivässä tai enemmän": 1,
        "2–3 annosta päivässä": 1,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 1,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö perunaa": 0
    };
    return points[answer];
}

// 3. Rasvan laatu / pehmeä rasva (0-15 points)
function scoreRasvanLaatu(answers) {
    q13 = scoreQuestion13(answers);
    if (!Number.isFinite(q13)) console.log(q13);
    q14 = scoreQuestion14(answers);
    if (!Number.isFinite(q14)) console.log(q14);
    q15 = scoreQuestion15(answers);
    if (!Number.isFinite(q15)) console.log(q15);
    q16 = scoreQuestion16(answers);
    if (!Number.isFinite(q16)) console.log(q16);
    q24 = scoreQuestion24(answers);
    if (!Number.isFinite(q24)) console.log(q24);


    total = q13 + q14 + q15 + q16 + q24;
    //total = scoreQuestion13(answers) + scoreQuestion14(answers) + scoreQuestion15(answers) + scoreQuestion16(answers) + scoreQuestion24(answers);
    //if (!Number.isFinite(total)) console.log(total);


    return total
}


function scoreQuestion13(answers) {
    const answer = answers["13. Mitä rasvaa kotonasi käytetään yleisimmin ruoanvalmistuksessa?"];
    const points = {
        "Kasviöljyä tai juoksevaa kasviöljyvalmistetta*": 3,
        "Kasvirasvalevitettä, jossa 55–80 % rasvaa ja sydänmerkki* tai Oivariinia, jossa on sydänmerkki": 2,
        "Kasvirasvalevitettä, jossa ei ole sydänmerkkiä*": 1,
        "Voi-kasviöljyseosta*": 1,
        "Voita tai kookosöljyä": 0,
        "Ei mitään": 0,
        "Kotona ei valmisteta ruokaa": 0
    };
    return points[answer];
}

function scoreQuestion14(answers) {
    const answer = answers["14. Mitä kermaa tai kermankaltaista valmistetta kotonasi käytetään yleisimmin ruoanvalmistuksessa?"];
    const points = {
        "Kasvikermaa*": 1,
        "Ruoanvalmistusjogurttia*": 0,
        "Ruokakermaa, kevytkermaa, kevytranskankermaa, kevytsmetanaa, kermaviiliä tai vastaavaa": 0,
        "Vispikermaa, kuohukermaa, kookosmaitoa, kookoskermaa, ranskankermaa tai smetanaa tai": 0,
        "Ei mitään": 1,
        "Kotona ei valmisteta ruokaa": 0
    };
    return points[answer];
}
function scoreQuestion15(answers) {
    const answer = answers["15. Kuinka usein käytät kasviöljypohjaista kastiketta tai kasviöljyjä lisättynä salaattiin tai valmiiseen ruokaan?"];
    const points = {
        "Päivittäin": 4,
        "4–6 kertaa viikossa": 3,
        "2–3 kertaa viikossa": 2,
        "Kerran viikossa tai harvemmin": 1,
        "En käytä kasviöljyjä": 0
    };
    return points[answer];
}
function scoreQuestion16(answers) {
    const answer = answers["16. Mitä rasvaa käytät levitteenä leivällä?"];
    const points = {
        "Kasvirasvalevitettä, jossa on 55–80 % rasvaa ja sydänmerkki*, kasviöljyä* tai Oivariinia, jossa on": 5,
        "Kasvirasvalevitettä, jossa on 30–40 % rasvaa ja sydänmerkki*": 3,
        "Kasvirasvalevitettä, jossa ei ole sydänmerkkiä*": 1,
        "Voi-kasviöljyseosta*": 1,
        "Voita": 0,
        "En käytä mitään": 0
    };
    return points[answer];
}
function scoreQuestion24(answers) {
    const answer = answers["24. Kuinka paljon syöt pähkinöitä, siemeniä ja manteleita tai niistä tehtyjä levitteitä?"];
    const points = {
        "2 annosta tai enemmän päivässä": 3,
        "1 annoksen päivässä": 3,
        "4–6 annosta viikossa": 2,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö näitä": 0
    };
    return points[answer];
}


// 4. Kasvikset, marjat ja hedelmät (0-20 points)
function scoreKasviksetMarjatHedelmit(answers) {
    // Vihannekset, juurekset ja sienet (question 20)
    const vihanneksia = scoreQuestion20(answers);
    if (!Number.isFinite(vihanneksia)) console.log(vihanneksia);

    //console.log("Kasvis score here")
    //console.log(vihanneksia)
    // Marjat ja hedelmit (question 21)
    const marjat_hedelmit = scoreQuestion21(answers);
    if (!Number.isFinite(marjat_hedelmit)) console.log(marjat_hedelmit);

    //console.log(marjat_hedelmit)
    if ((vihanneksia + marjat_hedelmit) < 10){
        täysmehu = scoreQuestion22(answers);
        if (!Number.isFinite(täysmehu)) console.log(täysmehu);

        //console.log(täysmehu)
        tulos = vihanneksia + marjat_hedelmit + täysmehu;
    } else {
        tulos = vihanneksia + marjat_hedelmit;
    }
    //console.log("------------------------------")
    return tulos;

}

// Vihannekset, juurekset ja sienet (question 20)
function scoreQuestion20(answers) {
    const answer = answers["20. Kuinka paljon syöt vihanneksia, juureksia ja sieniä?"];
    const points = {
        "4 annosta päivässä tai enemmän": 10,
        "3 annosta päivässä": 9,
        "2 annosta päivässä": 8,
        "1 annoksen päivässä": 6,
        "4–6 annosta viikossa": 4,
        "1–3 annosta viikossa": 2,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö vihanneksia, juureksia tai sieniä": 0
    };
    return points[answer];
}

// Marjat ja hedelmit (question 21)
function scoreQuestion21(answers) {
    const answer = answers["21. Kuinka paljon syöt marjoja ja hedelmiä?"];
    const points = {
        "4 annosta päivässä tai enemmän": 10,
        "3 annosta päivässä": 9,
        "2 annosta päivässä": 8,
        "1 annoksen päivässä": 6,
        "4–6 annosta viikossa": 4,
        "1–3 annosta viikossa": 2,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö marjoja tai hedelmiä": 0
    };
    return points[answer];
}

// Täysmehu (question 22)
function scoreQuestion22(answers) {
    const answer = answers["22. Kuinka paljon juot täysmehuja?"];
    const points = {
        "2 annosta päivässä tai enemmän": 0,
        "1 annoksen päivässä": 0,
        "5–6 annosta viikossa": 0,
        "3–4 annosta viikossa": 1,
        "1–2 annosta viikossa": 0,
        "Vähemmän kuin annoksen viikossa": 0,
        "En juo täysmehuja": 0
    };
    return points[answer];
}

// 5. Naposteltavat ja juomat (0-15 points)
function scoreNaposteltavatJuomat(answers) {
    const total = scoreQuestion39(answers) + scoreQuestion40(answers) + scoreQuestion41(answers) + scoreQuestion44_46(answers) + scoreQuestion45(answers) + scoreQuestion47(answers)
    
    if (!Number.isFinite(scoreQuestion39(answers))) console.log(scoreQuestion39(answers));

    if (!Number.isFinite(scoreQuestion40(answers))) console.log(scoreQuestion40(answers));

    if (!Number.isFinite(scoreQuestion39(answers))) console.log(scoreQuestion39(answers));

    if (!Number.isFinite(scoreQuestion41(answers))) console.log(scoreQuestion41(answers));

    if (!Number.isFinite(scoreQuestion44_46(answers))) console.log(scoreQuestion44_46(answers));

    if (!Number.isFinite(scoreQuestion45(answers))) console.log(scoreQuestion45(answers));
    return total
}


// Question 39 (pikaruoat)
function scoreQuestion39(answers) {
    const answer = answers["39. Kuinka paljon syöt pikaruokia tai suolaisia naposteltavia?"];
    const points = {
        "2 annosta päivässä tai enemmän": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 0,
        "1–3 annosta viikossa": 1,
        "1–3 annosta kuukaudessa": 2,
        "Vähemmän kuin 1 annoksen kuukaudessa": 3,
        "En syö näitä": 3
    };
    
    return points[answer];
}



// Question 40 (makeiset ja leivonnaiset)
function scoreQuestion40(answers) {
    const answer = answers["40. Kuinka paljon syöt makeita leivonnaisia, jäätelöä, vanukkaita, suklaata tai makeisia?"];
    const points = {
        "2 annosta päivässä tai enemmän": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 1,
        "1–3 annosta viikossa": 2,
        "Vähemmän kuin 1 annoksen viikossa": 3,
        "En syö näitä": 3
    };
    //console.log(answer)
    //console.log(points[answer])
    return points[answer];
}


// Question 41 (sokeri ja hunaja)
function scoreQuestion41(answers) {
    const answer = answers["41. Kuinka paljon käytät sokeria tai hunajaa?"];
    const points = {
        "2 annosta päivässä tai enemmän": 0,
        "1 annoksen päivässä": 1,
        "1–3 annosta viikossa": 1,
        "4–6 annosta viikossa": 1,
        "Vähemmän kuin 1 annoksen viikossa": 2,
        "En käytä näitä": 2
    };
    //console.log(points[answer])
    return points[answer];
}

// Question 44 (sokeripitoiset juomat) ja 46 maksetaan yhdessä
function scoreQuestion44_46(answers) {
    const answer_44 = answers["44. Kuinka paljon juot sokeroituja mehuja tai sokeroituja virvoitus- tai energiajuomia?"];
    const points_44 = {
        "3 annosta päivässä tai enemmän": 3,
        "2 annosta päivässä": 2,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin annoksen viikossa": 0,
        "En juo sokeroituja juomia": 0
    };
    const answer_46 = answers["46. Kuinka paljon juot alkoholitonta olutta, siideriä, viiniä tai long drink -juomia?"];
    const points_46 = {
        "3 annosta päivässä tai enemmän": 3,
        "2 annosta päivässä": 2,
        "1 annoksen päivässä": 1,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin annoksen viikossa": 0,
        "En juo alkoholittomia juomia": 0
    };
    // Tulos päivittäiset kulutuksen mukaan
    final_points = (points_44[answer_44] + points_46[answer_46]) * 0.5;

    if (final_points >= 1) {
        tulos = 0;
    } else if (final_points > 0.4) {
        tulos = 1;
    } else if (final_points > 0.1) {
        tulos = 2;
    } else if (final_points >= 0) {
        tulos = 3;
    }else {
        tulos = "aaaaaaaaaa"
    };

    return tulos;
}


function scoreQuestion45(answers) {
    const answer = answers["45. Kuinka paljon juot sokerittomia mehuja tai sokerittomia virvoitus- tai energiajuomia?"];
    const points = {
        "3 annosta päivässä tai enemmän": 0,
        "2 annosta päivässä": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 0,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin annoksen viikossa": 2,
        "En juo sokerittomia juomia": 2
    };
    return points[answer];
}

// Question 47 (alkoholijuomat)
function scoreQuestion47(answers) {
    const answer = answers["47. Kuinka paljon juot alkoholijuomia?"];
    const points = {
        "3 annosta päivässä tai enemmän": 0,
        "2 annosta päivässä": 0,
        "1 annoksen päivässä": 0,
        "4–6 annosta viikossa": 0,
        "1–3 annosta viikossa": 1,
        "Vähemmän kuin annoksen viikossa": 2,
        "En juo alkoholijuomia": 2
    };
    return points[answer];
}

// 6. Maitovalmisteet ja kasvipohjaiset vaihtoehdot (0-10 points)
function scoreMaitovalmisteet(answers) {

    vähärasvaiset_maidot = scoreQuestion35(answers);
    if (!Number.isFinite(vähärasvaiset_maidot)) console.log(vähärasvaiset_maidot);

    kasvipohjaiset = scoreQuestion38(answers);
    if (!Number.isFinite(kasvipohjaiset)) console.log(kasvipohjaiset);

    vähärasvaiset_juustot = scoreQuestion32(answers);
    if (!Number.isFinite(vähärasvaiset_juustot)) console.log(vähärasvaiset_juustot);

    keskirasvaiset_maidot = scoreQuestion36(answers);
    if (!Number.isFinite(keskirasvaiset_maidot)) console.log(keskirasvaiset_maidot);

    täysirasvaiset_maidot = scoreQuestion37(answers);
    if (!Number.isFinite(täysirasvaiset_maidot)) console.log(täysirasvaiset_maidot);

    rasvaiset_juustot = scoreQuestion33(answers);
    if (!Number.isFinite(rasvaiset_juustot)) console.log(rasvaiset_juustot);

    vegaaniset_juustot = scoreQuestion34(answers);
    if (!Number.isFinite(vegaaniset_juustot)) console.log(vegaaniset_juustot);


    vähärasvaisia_maitovalmisteita = vähärasvaiset_maidot + kasvipohjaiset + vähärasvaiset_juustot

    total = 0
    //console.log("vähärasvaisia_maitovalmisteita 2-3")
    //console.log(vähärasvaisia_maitovalmisteita)
    if (vähärasvaisia_maitovalmisteita >= 4) total += 4;
    else if (vähärasvaisia_maitovalmisteita >= 2) total += 5;
    else if (vähärasvaisia_maitovalmisteita >= 1) total += 3;
    else if (vähärasvaisia_maitovalmisteita >= 0.4) total += 2;
    else if (vähärasvaisia_maitovalmisteita >= 0.1) total += 1;
    else total += 0;

    vähärasvaisten_nestemäisten = vähärasvaiset_maidot + kasvipohjaiset
    //console.log("Max score >=1")
    //console.log(vähärasvaisten_nestemäisten)
    if (vähärasvaisten_nestemäisten >= 1) total += 1;
    else total += 0;

    //console.log("Max score <=1")
    //console.log(keskirasvaiset_maidot)
    if (keskirasvaiset_maidot <= 1) total += 1;
    else total += 0;

    //console.log("Max score <=1")
    //console.log(täysirasvaiset_maidot)
    if ((täysirasvaiset_maidot * 7) <= 1) total += 1;
    else total += 0;


    // 4. Rasvaisten juustojen ja juustonkaltaisten tuotteiden
    rasvaiset_viikossa = rasvaiset_juustot + vegaaniset_juustot;
    if (rasvaiset_viikossa <= 0.30) total += 2;
    else total += 0;

    return total
}


function scoreQuestion35(answers) {
    // Question 35 (vähärasvaiset maitovalmisteet)
    const answer = answers["35. Kuinka paljon käytät rasvattomia tai vähärasvaisia maitovalmisteita (rasvaa enintään 1 %)?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En käytä näitä": 0
    };
    return points[answer];
}

function scoreQuestion38(answers) {
    const answer = answers["38. Kuinka paljon käytät kasvipohjaisia juomia tai jogurtteja, joita on täydennetty ravintoaineilla?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En käytä näitä": 0
    };

    return points[answer];
}


function scoreQuestion32(answers) {
    const answer = answers["32. Kuinka paljon syöt vähärasvaista juustoa (rasvaa enintään 17 %)?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö vähärasvaista juustoa": 0
    };
    
    return points[answer];
}


function scoreQuestion36(answers) {
    const answer = answers["36. Kuinka paljon käytät keskirasvaisia maitovalmisteita (rasvaa enemmän kuin 1 %, mutta alle 3 %)?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En käytä keskirasvaisia maitovalmisteita": 0
    };
    return points[answer];
}


function scoreQuestion37(answers) {
    const answer = answers["37. Kuinka paljon käytät täysrasvaisia maitovalmisteita (rasvaa vähintään 3 %)?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En käytä täysrasvaisia maitovalmisteita": 0
    };
    //console.log("Check here")
    //console.log(answer)
    //console.log(points[answer])
    return points[answer];
}


function scoreQuestion33(answers) {
    const answer = answers["33. Kuinka paljon syöt rasvaista juustoa (rasvaa yli 17 %)?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö rasvaista juustoa": 0
    };
    return points[answer];
}


function scoreQuestion34(answers) {
    const answer = answers["34. Kuinka paljon syöt vegaanista juustonkaltaista tuotetta?"];
    const points = {
        "4 annosta päivässä tai enemmän": 4.0,
        "3 annosta päivässä": 3.0,
        "2 annosta päivässä": 2.0,
        "1 annoksen päivässä": 1.0,
        "4–6 annosta viikossa": 5/7,
        "1–3 annosta viikossa": 2/7,
        "Vähemmän kuin 1 annoksen viikossa": 0,
        "En syö vegaanista juustonkaltaista tuotetta": 0
    };
    return points[answer];
}




// 7. Ateriarytmi (0-10 points)
function scoreAteriarytmi(answers) {

    total = 0;

    aamupala = scoreQuestion1(answers);
    if (!Number.isFinite(aamupala)) console.log(aamupala);

    aamu_välipala = scoreQuestion2(answers);
    if (!Number.isFinite(aamu_välipala)) console.log(aamu_välipala);

    lounas = scoreQuestion3(answers);
    if (!Number.isFinite(lounas)) console.log(lounas);

    ilta_välipala = scoreQuestion4(answers);
    if (!Number.isFinite(ilta_välipala)) console.log(ilta_välipala);

    päivällinen = scoreQuestion5(answers);
    if (!Number.isFinite(päivällinen)) console.log(päivällinen);

    iltapala = scoreQuestion6(answers);
    if (!Number.isFinite(iltapala)) console.log(iltapala);

    välipala = scoreQuestion7(answers);
    if (!Number.isFinite(välipala)) console.log(välipala);


    säännöllisyys = aamupala + lounas + päivällinen;
    frequency = (Math.round(säännöllisyys/3) * 5);

    total += frequency;

    // Aterioiden määrä
    määrä = aamupala + aamu_välipala + lounas + ilta_välipala + päivällinen + iltapala + välipala;

    if (määrä < 1) total += 0;
    else if (määrä <= 1.9) total += 1;
    else if (määrä <= 2.9) total += 2;
    else if (määrä <= 3.9) total += 4;
    else if (määrä <= 6) total += 5;
    else total += 3;

    return total;
}


function scoreQuestion1(answers) {
    const answer = answers["1. Kuinka usein syöt aamupalan?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö aamupalaa": 0
    };
    return points[answer];
}

function scoreQuestion2(answers) {
    const answer = answers["2. Kuinka usein syöt aamupäivällä välipalan?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö aamupäivän aikana välipalaa": 0
    };
    return points[answer];
}

function scoreQuestion3(answers) {
    const answer = answers["3. Kuinka usein syöt lounaan?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö lounasta": 0
    };
    return points[answer];
}

function scoreQuestion4(answers) {
    const answer = answers["4. Kuinka usein syöt iltapäivällä välipalan?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö iltapäivän aikana välipalaa": 0
    };
    return points[answer];
}

function scoreQuestion5(answers) {
    const answer = answers["5. Kuinka usein syöt päivällisen tai illallisen?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö päivällistä tai illallista": 0
    };
    return points[answer];
}

function scoreQuestion6(answers) {
    const answer = answers["6. Kuinka usein syöt iltapalan?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö iltapalaa": 0
    };
    return points[answer];
}

function scoreQuestion7(answers) {
    const answer = answers["7. Kuinka usein syöt muita välipaloja aterioiden välillä?"];
    const points = {
        "Joka päivä": 1,
        "4–6 päivänä viikossa": 5/7,
        "1–3 päivänä viikossa": 2/7,
        "Harvemmin kuin kerran viikossa": 0,
        "En syö muita välipaloja": 0
    };
    return points[answer];
}

// Export the function for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateDietScore };
}
