import React, {useState} from 'react';
import {Button, Col, Form, OverlayTrigger, Popover, Row, Tooltip} from "react-bootstrap";

const Pop = () => {
    return (
    <Tooltip id={'termsandconditions-popover'}>
        No ice cream will actually be delivered
    </Tooltip>
    )
}

const CheckboxLabel =  () => {
    return(
        <span>
      I agree to
      <OverlayTrigger placement="right" overlay={Pop()}>
        <span style={{ color: 'blue'}}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
)
};

export const SummaryForm = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={<CheckboxLabel/>} onChange={(event) => setIsButtonDisabled(!event.target.checked)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isButtonDisabled}>
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

