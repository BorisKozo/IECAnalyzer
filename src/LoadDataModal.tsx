import React from "react";
import {Modal, Form} from "react-bootstrap";
import {FileUploader} from "react-drag-drop-files";

interface ILoadDataModalProps {
    show: boolean;
    onClose: (csvData: string) => void;
}

function LoadDataModal({show, onClose}: ILoadDataModalProps) {
    const handleClose = () => {
        onClose('');
    }

    const handleChange = (file: File) => {
        file.text().then((textContent) => {
            onClose(textContent);
        });
    };

    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title>טעינת דו"ח</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reportContent">
                        <Form.Label>טעינה של קובץ הדו"ח</Form.Label>
                        <FileUploader handleChange={handleChange} label={''} types={['CSV']}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoadDataModal;