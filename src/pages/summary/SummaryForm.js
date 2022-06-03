import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Tooltip} from "react-bootstrap";

console.log({React, Form, Button, Popover, OverlayTrigger})
export const SummaryForm = ({ setOrderPhase }) => {
    const [tcChecked, setTcChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        // pass along to the next phase.
        // The next page will handle submitting order from context.
        setOrderPhase("completed");
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={
                        <span>
                          I agree to
                            <OverlayTrigger overlay={
                                (<Tooltip id="hi">No ice cream will actually be delivered</Tooltip>)
                            } placement="top">
                                <span style={{ color: "blue" }}> Terms and Conditions</span>
                            </OverlayTrigger>
                        </span>
                    }
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    );
}
