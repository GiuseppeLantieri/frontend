import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToastB from 'react-bootstrap/Toast';

function Toast({ type, message }: {
    type: string, message: string
}) {
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    return (
        <Row>
            <Col md={6} className="mb-2">
                <ToastB show={showA} onClose={toggleShowA}>
                    <ToastB.Header>
                        {type}
                    </ToastB.Header>
                    <ToastB.Body>{message}</ToastB.Body>
                </ToastB>
            </Col>
        </Row>
    );
}

export default Toast;