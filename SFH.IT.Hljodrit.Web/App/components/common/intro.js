import React from 'react';
import { browserHistory } from 'react-router';

const Intro = () => {
    return (
        <div>
            <h2>Velkomin/n</h2>
            <p>Á þessari vefsíðu er hægt að gera eftirfarandi:</p>
            <ul>
                <li>Skráning verkefna</li>
                <li>Úthlutun ISRC kóða</li>
                <li>Verkskipulag útgáfu</li>
            </ul>
            <p>Hljóðrit.is er forsenda einstaklingsúthlutunar. Skráning flytjendaréttar er jafn sjálfsögð og skráning höfundaréttar. Virðum réttindi flytjenda og vöndum skráningu.</p>
            <p>Þegar plata hefur ekki verið gefin út er talað um verkefni. Á þessari vefsíðu er boðið upp á að búa til verkefni og ef verkefnið er rétt útfyllt getur starfsmaður Hljóðrita ákveðið að samþykkja verkefnið og við það verður verkefnið gefið út og ISRC-kóðar gefnir út fyrir hvert lag á verkefninu. Þegar starfsmaður hefur samþykkt verkefnið er það orðið að útgefnu efni eða plötu.</p>
            <strong>Ert þú rétt skráður?</strong>
            <div className="text-right">
                <button className="btn btn-default btn-primary" onClick={() => browserHistory.push('/app/projects')} ><i className="fa fa-fw fa-arrow-right"></i> Áfram</button>
            </div>
        </div>
    );
}

export default Intro;