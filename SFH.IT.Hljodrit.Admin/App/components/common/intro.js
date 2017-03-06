import React from 'react';

export default class Intro extends React.Component {
    render() {
        return (
            <div>
                <h2>Velkomin/n</h2>
                <p>Á þessari vefsíðu er hægt að gera eftirfarandi:</p>
                <ul>
                    <li>Sýsla með innsendar plötur</li>
                    <li>Skrá nýjar plötur</li>
                    <li>Reikna út flutnings- og þóknunargjöld</li>
                </ul>
            </div>
        );
    }
}