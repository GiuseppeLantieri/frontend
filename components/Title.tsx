'use client';

import useViewportState from "beautiful-react-hooks/useViewportState";

export function Title({ title }: { title: string }) {
    const { width } = useViewportState();

    if (width < 1000) {
        return (
            <div style={{ margin: "0.5em", fontSize: "42px" }}>
                <h1>{title}</h1>
            </div>
        );
    }

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", fontSize: "42px" }}>
            <h1>{title}</h1>
        </div>
    );
}
