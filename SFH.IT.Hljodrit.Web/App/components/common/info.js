import React from 'react';

const Info = () => {
    return (
        <div>
            <h2>Upplýsingar</h2>
            <div className="info-section">
                <strong>Aðeins þú hefur aðgang að þínum verkefnum</strong>
                <p>
                    Á síðunni "verkefnin þín" geta skráðir notendur viðhaldið öllum verkefnum. Verkefnalisti birtist yfir þau verkefni sem eru í gangi. Þú getur skoðað verkefni eftir stöðu þeirra, en verkefnum er raðað í öfugrí tímaröð, nýjustu verkefnin birtast efst.

                    Verkefni fá eftirfarandi stöður í þessari röð:

                    (a) Í Vinnslu, (b) Hljóðritun Lokið, og (c) Tilbúið til útgáfu.

                    Kerfið hjálpar þér að fara yfir þær upplýsingar sem þú þarft að hafa skráð á hverju stigi. Þegar þú merkir að verkefni sé tilbúið til útgáfu þá er krafist ákveðinna upplýsinga s.s. ISRC auðkennis á hverju hljóðriti, að flytjendur séu skráðir ofl. Við þessa aðgerð læsist verkefnið þ.e. ekki er hægt að breyta upplýsingum í verkefnum með þessari stöðu.

                    Smellt er á "Nýskrá" til að skrá nýtt verkefni eða verkefni valið úr listanum til að breyta.

                    Skilyrt svæði eru aðkennd með (*)
                </p>
            </div>
            <div className="info-section">
                <strong>Skráning verkefnis</strong>
                <p>
                    Gefðu verkefninu eitthvað greinargott nafn. Það má vera tímabundið vinnuheiti, en endanlegt heiti útgáfunnar / geisladisksins þarf að skrá áður en verkið er skráð sem tilbúið til útgáfu, en svæðið "Endanlegt útgáfuheiti" gefur til kynna hvort sé.
                    Umsjónarmaður er skráður með því að smella á hnapp fyrir aftan svæðið (stækkunarglerið), en við það birtist gluggi þar sem gefinn er kostur á að leita að aðila eftir kennitölu eða hluta úr nafni og velja, eða nýskrá, sé aðili ekki til á skrá.
                </p>
            </div>
            <div className="info-section">
                <strong>Skráning hljóðrita og flytjenda</strong>
                <p>
                    Við skráningu hljóðrits er smellt á "Skrá nýtt hljóðrit" inni í verkefni. Við það birtist ný skráningarmynd. Þú byrjar á því að gefa hljóðritinu nafn og smellir á "Vista", en við það birtist stærri skráningarmynd þar sem þú getur bætt aðilum á hljóðritið.
                    Aðila er bætt á hljóðrit með því að smella á "Velja aðila", en við það birtist samskonar gluggi / aðgerð eins og lýst var við skráningu umsjónarmanns. Sé listamaður til og þekktur undir öðrum listamanns nöfnum þá birtast þau í svæði "Listamanns nafn", en þar getur þú einnig skráð nýtt listamanns nafn sem þá um leið bætist við upplýsingar um flytjandann.
                    Síðan skráir þú hlutverk og hljóðfæri ef um flytjanda er að ræða. Athugaðu að í báðum þessum listum getur þú skráð fyrstu stafina í því sem þú leitar að og kerfið birtir viðeigandi niðurstöður. Að lokum smellir þú á "Skrá aðila á hljóðrit".
                    Um leið og flytjendur eru skráðir á hljóðrit birtist einnig hlutfallstala þeirra í hljóðritinu sem notuð er til útreiknings flutningstekna (Sjá forsendur hjá SFH). 
                </p>
            </div>
            <div className="info-section">
                <strong>Hraðskráning - Setja aðila í biðminni</strong>
                <p>Með því að setja alla aðila á einu hljóðriti í biðminni getur þú skáð þá alla á annað hljóðrit með einu handtaki. Þetta getur þú einnig nýtt þér á milli verkefna.</p>
            </div>
            <div className="info-section">
                <strong>Að flytja verkefni yfir á næsta stig</strong>
                <p>
                    Ef verkefni er á vinnslustigi er gefinn kostur á að flytja það yfir á næsta stig sem er "Hljóðritun lokið". Síðan er hægt að flytja verkefni yfir á lokastig eða "Tilbúið til útgáfu", en við báðar þessar aðgerðir athugar kerfið að nauðsynlegar upplýsingar séu skráðar..
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