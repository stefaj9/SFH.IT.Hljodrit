import React from 'react';

const Info = () => {
    return (
        <div>
            <h2>Upplýsingar</h2>
            <div className="info-section">
                <strong>Verkefnastýring</strong>
                <p>Í verkefnastýringu er boðið upp á að sýsla með innsend verkefni. Innsend verkefni geta verið í fjórum mismunandi stöðum, þ.e. Í vinnslu, Hljóðritun lokið, Tilbúið til útgáfu og Búið að gefa út. Hægt er að flokka verkefni eftir stöðum og einnig leita eftir nafni á verkefni, aðalflytjanda o.fl. Þegar smellt er á "Samþykkja" opnast gluggi sem býður upp á að fara yfir verkefni og ef allar upplýsingar standast, þá er smellt á "Samþykkja" og þá verður verkefnið gefið út og hljóðritin á plötunni fá ISRC-kóða. Ef ekki allt stenst, er annað hvort hægt að "Senda athugasemd" sem sendir athugasemd til þess notanda sem sendi inn verkefnið eða valið að breyta sjálfur verkefninu með því að smella á "Breyta". Ef verkefnið er óviðeigandi er hægt að eyða því með því að smella á "Eyða".</p>
                <img src="/App/resources/project-management.png" className="img-contained" alt="Umsýsla verkefna" />
                <p><i>(Mynd 1. Umsýsla verkefna.)</i></p>
                <img src="/App/resources/project-management-approve.png" className="img-contained" alt="Samþykkja verkefni" />
                <p><i>(Mynd 2. Samþykkja verkefni.)</i></p>
                <img src="/App/resources/project-management-change.png" className="img-contained" alt="Breyta verkefni" />
                <p><i>(Mynd 3. Breyta verkefni.)</i></p>
                <img src="/App/resources/project-management-comment.png" className="img-contained" alt="Athugasemd verkefnis" />
                <p><i>(Mynd 4. Senda athugasemd varðandi verkefni.)</i></p>
                <img src="/App/resources/project-management-delete.png" className="img-contained" alt="Eyða verkefni" />
                <p><i>(Mynd 5. Eyða verkefni.)</i></p>
            </div>
            <div className="info-section">
                <strong>Hljóðrit</strong>
                <p>Í þessum flipa er boðið upp á að leita af hljóðritum eftir ákveðnum skilyrðum. Hægt er að fara inn í hvert og eitt hljóðrit með því að smella á þær niðurstöður sem koma og þá er farið í frekari upplýsingar um hljóðritið. Þar er að sjá flytjendur, plötur sem hljóðrit kemur fyrir á, o.s.frv. Ekki er boðið upp á að breyta hljóðriti.</p>
                <img src="/App/resources/media-overview.png" className="img-contained" alt="Yfirlit hljóðrita" />
                <p><i>(Mynd 6. Yfirlit yfir hljóðrit.)</i></p>
                <img src="/App/resources/media-details.png" className="img-contained" alt="Frekari upplýsingar um hljóðrit" />
                <p><i>(Mynd 7. Frekari upplýsingar um hljóðrit.)</i></p>
            </div>
            <div className="info-section">
                <strong>Útgefendur</strong>
                <p>Í þessum flipa er boðið upp á að sýsla með og búa til nýja útgefendur. Hægt er að leita af útgefendum eftir ákveðnum leitarskilyrðum og smella á þær niðurstöður sem upp koma til þess að fá frekari upplýsingar um útgefendur. Á þeirri síðu er boðið upp á að breyta upplýsingum um útgefendur ásamt því að sjá upplýsingar um hvaða plötur viðkomandi útgefandi hefur gefið út. Ef valið er að búa til nýjan útgefanda þarf að fylla inn réttar upplýsingar og síðan er hægt eftir að hann hefur verið stofnaður að skrá á hann 'Label' og ISRC-seríu.</p>
                <img src="/App/resources/publisher-overview.png" className="img-contained" alt="Yfirlit yfir útgefendur" />
                <p><i>(Mynd 8. Yfirlit yfir útgefendur.)</i></p>
                <img src="/App/resources/publisher-create.png" className="img-contained" alt="Búa til útgefenda" />
                <p><i>(Mynd 9. Búa til útgefendur.)</i></p>
                <img src="/App/resources/publisher-details-1.png" className="img-contained" alt="Frekari upplýsingar um útgefanda" />
                <p><i>(Mynd 10. Frekari upplýsingar um útgefenda.)</i></p>
            </div>
            <div className="info-section">
                <strong>Plötur</strong>
                <p>Hér er hægt að sýsla með plötur og búa til nýjar plötur. Hægt er að leita af plötum eftir ákveðnum leitarskilyrðum og smella á þær niðurstöður sem upp koma til þess að fá frekari upplýsingar um plötuna. Frekari upplýsingar eru t.d. nafn plötu, útgáfuár, aðalflytjandi, o.fl. Einnig er hægt að eyða út lögum sem eru á plötunni og bæta við. Hægt er að smella á lag innan plötunnar og sjá þar flytjendur sem skráðir eru á viðkomandi lag. Á þeirri síðu er hægt að breyta hlutverki og hljóðfæri flytjenda, ásamt því að eyða þeim og bæta við öðrum. Einnig er hægt að breyta öllum upplýsingum um lagið á plötunni. Athugið þó að ef þessum upplýsingum er breytt hefur það EKKI áhrif á hljóðritið sem liggur að baki.</p>
                <img src="/App/resources/albums-overview.png" className="img-contained" alt="Yfirlit yfir plötur" />
                <p><i>(Mynd 11. Yfirlit yfir plötur.)</i></p>
                <img src="/App/resources/albums-details.png" className="img-contained" alt="Frekari upplýsingar um plötu" />
                <p><i>(Mynd 12. Frekari upplýsingar um plötu.)</i></p>
                <img src="/App/resources/song-details.png" className="img-contained" alt="Frekari upplýsingar um lag á plötu" />
                <p><i>(Mynd 13. Frekari upplýsingar um lag á plötu.)</i></p>
                <img src="/App/resources/song-details-add-performer.png" className="img-contained" alt="Bæta við flytjanda á lag á plötu" />
                <p><i>(Mynd 14. Bæta við flytjanda á lag á plötu.)</i></p>
            </div>
            <div className="info-section">
                <strong>Aðilar</strong>
                <p>Hér er hægt að sýsla með aðila. Hægt er að leita af aðilum eftir ákveðnum leitarskilyrðum og smella á þær niðurstöður sem upp koma til þess að fá frekari upplýsingar um flytjandann. Með því að smella er farið inn í frekari upplýsingar um flytjandann og þar er hægt að sjá hvaða hljóðritum flytjendi kemur fyrir á og plötum. Einnig er hægt að eyða þessum flytjanda og breyta upplýsingum um hann.</p>
                <img src="/App/resources/performers-overview.png" className="img-contained" alt="Yfirlit yfir flytjendur" />
                <p><i>(Mynd 15. Yfirlit yfir flytjendur.)</i></p>
                <img src="/App/resources/performers-details.png" className="img-contained" alt="Frekari upplýsingar um flytjanda" />
                <p><i>(Mynd 16. Frekari upplýsingar um flytjanda.)</i></p>
            </div>
            <div className="info-section">
                <strong>Tannhjól</strong>
                <p>Í hægra horninu er tannhjól sem hægt er að smella á til þess að skoða villuskilaboð sem upp koma í kerfinu. Þessi eiginleiki er þó hannaður fyrir þróunarteymið til þess að auðvelda og hraða villumeðhöndlun innan kerfisins.</p>
                <img src="/App/resources/exception-overview.png" className="img-contained" alt="Yfirlit yfir villur" />
                <p><i>(Mynd 17. Yfirlit yfir villur.)</i></p>
                <img src="/App/resources/exception-details.png" className="img-contained" alt="Frekari upplýsingar um villur" />
                <p><i>(Mynd 18. Frekari upplýsingar um villur.)</i></p>
            </div>
            <div className="info-section">
                <strong>Að búa til plötu</strong>
                <p>Til þess að búa til plötu þarf að fara í gegnum 5 skref sem eru eftirfarandi:</p>
                <ol>
                    <li>Skrá plötuheiti</li>
                    <li>Skrá útgefanda</li>
                    <li>Skrá lög</li>
                    <li>Skrá flytjendur</li>
                    <li>Staðfesting</li>
                </ol>

                <p>Þegar verið er að skrá plötuheiti þarf að passa upp á plötuheiti sé í lagi. Til þess að klára þetta þrep þarf að fylla inn nafn, tegund plötu, útgáfuár og útgáfuland. Ef valið er að platan sé annað hvort "Single" eða "Safnplata", þá þarf ekki að skilgreina aðalflytjanda annars er það krafa.</p>
                <img src="/App/resources/create-album-basic.png" className="img-contained" alt="Fylla út grunnupplýsingar um plötu" />
                <p><i>(Mynd 19. Fylla út grunnupplýsingar um plötu.)</i></p>

                <p>Að skrá útgefanda felur í sér að smella á "Bæta við útgefanda" og þegar það er valið einhvern útgefanda, þá birtast bæði "Label" og ISRC-seríur sem þarf að velja til þess að ákvarða ISRC númer á lögunum sem verið er að skrá á þessa plötu. Þegar búið er að skrá þessar upplýsingar er hægt að fara í næsta skref.</p>
                <img src="/App/resources/create-album-publisher.png" className="img-contained" alt="Velja útgefanda" />
                <p><i>(Mynd 20. Velja útgefanda.)</i></p>

                <p>Hægt er að velja um tvær leiðir til þess að bæta við lagi, þ.e. að skrá nýtt lag eða velja lag sem er nú þegar útgefið. Ef farið er fyrri leiðina þarf að gefa laginu nafn, lengd og ISRC endingu. Ef smellt er á takka hægra megin sem myndar tvær örvar, þá gefur hann næsta lausa ISRC númer. Hins vegar ef það er farið seinni leiðina, þá er nóg að fara inn í flipann "Leita" og leita eftir ákveðnu lagi og smella á plúsinn þegar lagið er fundið og það bættist við. Ef notandi vill breyta röðun laga er hægt að draga lög til og frá í töflu fyrir neðan.</p>
                <img src="/App/resources/create-album-songs-new.png" className="img-contained" alt="Bæta við nýju lagi" />
                <p><i>(Mynd 21. Bæta við nýju lagi.)</i></p>
                <img src="/App/resources/create-album-songs-old.png" className="img-contained" alt="Bæta við nú þegar útgefnu lagi" />
                <p><i>(Mynd 22. Bæta við nú þegar útgefnu lagi.)</i></p>

                <p>Að skrá flytjendur á lag er hægt að gera á tvennan máta. Það er hægt að nýta sér hópa sem eru í stiku vinstra megin til þess að bæta við öll lög í einu. Þessi möguleiki er sérstaklega hentugur þegar um er að ræða plötu með mörgum lögum sem innihalda nánast alltaf flytjendur af sama tagi. Þá er hægt að smella á "Bæta við í hóp" til þess að búa til hópinn og síðan er hægt að breyta hlutverkum og hljóðfærum innan hópsins. Ef ekki er nýtt sér hópinn, er hægt að smella á hvert lag fyrir sig og þá birtist hnappur "Bæta við flytjanda". Ef smellt er á þann takka opnast gluggi en þar er valið flytjanda, hljóðfæri og hlutverk og þá bætist flytjandi við á þetta eina lag.</p>
                <img src="/App/resources/create-album-performers-1.png" className="img-contained" alt="Að bæta við flytjanda" />
                <p><i>(Mynd 23. Að bæta við flytjanda.)</i></p>
                <img src="/App/resources/create-album-performers-2.png" className="img-contained" alt="Að bæta við stökum flytjanda" />
                <p><i>(Mynd 24. Að bæta við stökum flytjanda.)</i></p>
                <img src="/App/resources/create-album-performers-3.png" className="img-contained" alt="Að bæta við hljóðfæri á stakan flytjanda" />
                <p><i>(Mynd 25. Að bæta við hljóðfæri á stakan flytjanda.)</i></p>
                <img src="/App/resources/create-album-performers-4.png" className="img-contained" alt="Að bæta við hlutverki á stakan flytjanda" />
                <p><i>(Mynd 26. Að bæta við hlutverki á stakan flytjanda.)</i></p>

                <p>Síðasta skrefið fer yfir þær upplýsingar sem voru slegnar inn í hinum þrepunum. Ef allt er með felldu er smellt á "Staðfesta" og þá verður til plata. Ef ekki er allt með felldu er hægt að fara til baka í fyrri skref og leiðrétta þær upplýsingar sem vantar upp á.</p>
                <img src="/App/resources/create-album-overview.png" className="img-contained" alt="Yfirlit yfir nýskráða plötu" />
                <p><i>(Mynd 27. Yfirlit yfir nýskráða plötu.)</i></p>
            </div>
        </div>
    );
};

export default Info;