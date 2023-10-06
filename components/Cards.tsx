import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardB from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import colors from '../constant/colors';


export function Card({ title, src, progress, description, id }: { title: string, src: string, progress: number, id: string, description: string }) {
    const click = () => { location.href = `/investi/${id}` }
    const [hoover, setHoover] = useState(false);

    const handleMouseEnter = () => {
        setHoover(true);
    };

    const handleMouseLeave = () => {
        setHoover(false);
    };
    return (
        <CardB style={{ width: '20rem', margin: "0px", borderRadius: "25px", padding: "0px", cursor: hoover ? "pointer" : "auto" }} onClick={click} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            {hoover ?
                <div style={{ padding: "3em", width: "20em", height: "24em", backgroundColor: colors.darkgreen, borderRadius: "25px", }}>
                    {description}
                </div>
                :
                <>
                    <CardB.Img variant="top" src={src} style={{ padding: "0px", width: "100%", height: "20em", borderRadius: "25px", }} />

                    <CardB.Body style={{ padding: "1em" }}>
                        <CardB.Title>{title}</CardB.Title>
                        <ProgressBar now={progress} />
                    </CardB.Body>
                </>
            }
        </CardB>

    );
}
