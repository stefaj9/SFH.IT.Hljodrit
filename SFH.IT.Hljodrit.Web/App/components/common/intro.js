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
            <strong>Ert þú rétt skráður?</strong>
            <div className="text-right">
                <button className="btn btn-default btn-primary" onClick={() => browserHistory.push('/app/projects')} ><i className="fa fa-fw fa-arrow-right"></i> Áfram</button>
            </div>
        </div>
    );
}

export default Intro;