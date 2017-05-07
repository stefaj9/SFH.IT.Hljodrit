import React from 'react';

const Info = () => {
    return (
        <div>
            <h2>Upplýsingar</h2>
            <div className="info-section">
                <strong>Aðeins þú hefur aðgang að þínum verkefnum</strong>
                <p>
                    Á síðunni "Verkefni" geta skráðir notendur viðhaldið öllum verkefnum. Verkefnalisti birtist yfir þau verkefni sem eru í gangi. Þú getur skoðað verkefni eftir stöðu þeirra, en verkefnum er raðað í öfugrí tímaröð, nýjustu verkefnin birtast efst.

                    Verkefni fá eftirfarandi stöður í þessari röð:

                    (a) Í Vinnslu, (b) Hljóðritun Lokið, (c) Tilbúið til útgáfu og (d) Búið að gefa út.

                    Kerfið hjálpar þér að fara yfir þær upplýsingar sem þú þarft að hafa skráð á hverju stigi. Passað er upp á að viðeigandi upplýsingar um verkefnið séu skráðir í hverju þrepi. Þrepin eru eftirfarandi:</p>
                <ol>
                    <li>Skrá verkefni</li>
                    <li>Skrá útgefanda</li>
                    <li>Skrá lög</li>
                    <li>Skrá flytjendur</li>
                    <li>Staðfesting</li>
                </ol>
                <p>
                    Smellt er á "Búa til nýtt verkefni" til að skrá nýtt verkefni eða verkefni valið úr listanum til að breyta.
                </p>
                <img src="/App/resources/create-project-overview.png" className="img-contained" alt="Yfirlitsmynd af verkefnum" />
                <p><i>(Mynd 1. Upplistun verkefna.)</i></p>
            </div>
            <div className="info-section">
                <strong>Skráning verkefnis</strong>
                <p>
                    Gefðu verkefninu eitthvað greinargott nafn. Það má vera tímabundið vinnuheiti, en endanlegt heiti útgáfunnar / geisladisksins þarf að skrá áður en verkið er skráð sem tilbúið til útgáfu, en svæðið "Endanlegt útgáfuheiti" gefur til kynna hvort sé.
                    Aðalflytjandi er skráður með því að smella á hnappinn "Skrá aðalflytjanda", en við það birtist gluggi þar sem gefinn er kostur á að leita að aðila eftir kennitölu eða hluta úr nafni og velja, eða nýskrá, sé aðili ekki til á skrá.
                </p>
                <img src="/App/resources/create-project-basic-info-1.png" alt="Bæta við útgefanda" className="img-contained"/>
                <p>
                    <i>(Mynd 4. Skrá grunnupplýsingar.)</i>
                </p>
            </div>
            <div className="info-section">
                <strong>Skráning útgefanda</strong>
                <p>
                    Við skráningu útgefanda er hægt að smella á "Skrá útgefanda" og þar er valinn útgefanda sem er til í listanum. Ekki er hægt að fara í næsta þrep nema útgefanda sé valinn.
                </p>
                <img src="/App/resources/create-project-publishers-1.png" alt="Bæta við útgefanda" className="img-contained"/>
                <p>
                    <i>(Mynd 3. Skrá útgefanda.)</i>
                </p>
            </div>
            <div className="info-section">
                <strong>Skráning hljóðrita og flytjenda</strong>
                <p>
                    Við skráningu hljóðrits er annað hvort skráð nýtt lag eða leitað eftir útgefnu lagi. Ef fyrri leið er valin, þá er byrjað að gefa laginu nafn og gefið laginu lengd, síðan er smellt á "Bæta við". Hins vegar ef seinni leiðin er valin, þá er smellt á "Leita" flipann og þá er gefið kost á að leita af lögum eftir ákveðnum skilyrðum. Þegar búið er að finna það lag sem á að bæta við er smellt á plúsinn. Hægt er að raða lögum eftir á með því að draga lög í töflu fyrir neðan til og frá.
                </p>
                <img src="/App/resources/create-project-songs-1.png" alt="Bæta við lögum" className="img-contained"/>
                <p>
                    <i>(Mynd 4. Skrá lag.)</i>
                </p>
                <img src="/App/resources/create-project-songs-2.png" alt="Bæta við útgefnum lögum" className="img-contained"/>
                <p>
                    <i>(Mynd 5. Skrá útgefið lag.)</i>
                </p>
            </div>
            <div className="info-section">
                <strong>Hraðskráning - Setja aðila í biðminni</strong>
                <p>Hægt er að vinna með hópa sem sjást í stiku vinstra megin. Þar er hægt að raða saman hóp sem er geymdur í skyndiminni og því hægt að bæta aðilum á mörg lög í einu og því flýta fyrir sér vinnuna.</p>
                <strong>Skrá flytjendur</strong>
                <p>Hægri megin er listi af lögum sem búið er að bæta við á plötuna, hægt er að smella á hvert og eitt lag og þá rennur niður listi yfir skráða flytjendur á lagið. Ef smellt er á "Bæta við flytjanda" er hægt að bæta við ákveðnum flytjanda á þetta eina lag. Við það að smella á "Bæta við flytjanda" opnast gluggi þar sem valið er nafn flytjanda, hljóðfæri og hlutverk. Gerð er krafa um að það sé a.m.k. einn flytjandi á hverju lagi.</p>
                <img src="/App/resources/create-project-performers-1.png" alt="Bæta við flytjendum." className="img-contained"/>
                <p>
                    <i>(Mynd 6. Skrá flytjendur á lög.)</i>
                </p>
            </div>
            <div className="info-section">
                <strong>Staðfesting</strong>
                <p>
                    Hér er gefið yfirlit yfir skráðar upplýsingar áður en verkefnið er sent inn til samþykktar. Ef allt er með felldu, er hægt að smella á "Staðfesta" og þá er verkefnið sent inn til samþykktar. Ef það er ekki allt með felldu, þá er hægt að fara til baka og laga þær upplýsingar sem eru ekki í lagi.
                </p>
                <img src="/App/resources/create-project-confirmation.png" alt="Yfirlit yfir innsendar upplýsingar." className="img-contained"/>
                <p>
                    <i>(Mynd 6. Yfirlit yfir innsendar upplýsingar.)</i>
                </p>
            </div>
            <div className="spacer"></div>
            <h3 className="text-left">Tengiliðir</h3>
            <p>Ef þig vantar upplýsingar af einvherju tagi. Sendi þá tölvupóst á viðeigandi aðila. Við reynum að svara samdægurs.</p>
            <div className="row">
                <div className="col-xs-6">
                    <div className="row">
                        <div className="col-xs-6"><strong>Fyrirspurnir um notkun</strong></div>
                        <div className="col-xs-6"><a href="mailto:hjalp@hljodrit.is">hjalp@hljodrit.is</a></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="row">
                        <div className="col-xs-6"><strong>Umsjón með skráningu</strong></div>
                        <div className="col-xs-6"><a href="mailto:umsjon@hljodrit.is">umsjon@hljodrit.is</a></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className="row">
                        <div className="col-xs-6"><strong>Forsvarsaðili hjá SFH</strong></div>
                        <div className="col-xs-6"><a href="mailto:hljodrit@hljodrit.is">hljodrit@hljodrit.is</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;