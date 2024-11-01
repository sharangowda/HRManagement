import React, { Component } from "react";

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Doc from "../components/DocServiceBio";
import PdfContainer from "../components/PdfContainer";

import { Button, Col, Container, Row, Table } from "react-bootstrap";

const { ToWords } = require("to-words");
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});
export default class Export extends Component {
  constructor(props) {
    super(props);
  }
  createPdf = (html, id) => Doc.createPdf(html, id);

  printDocument(name = null) {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(name ? `${name}.pdf` : "download.pdf");
    });
  }

  render() {
    return (
      <div>
        <div style={{ border: "1px solid LightGray" }}>
          <PdfContainer
            createPdf={(e) => {
              this.createPdf(e, this.props.id);
            }}
          >
            <div
              id="divToPrint"
              className="mt4"
              style={{ width: "210mm", height: "297mm" }}
            >
              {
                <Container
                  style={{ width: "200mm", height: "290mm" }}
                  className="py-2"
                >
                  <Container>
                    <div style={{ textAlign: "center" }} className="my-3">
                      <h4>Health and Wellness Health Care Services</h4>
                    </div>
                    <hr></hr>
                    <Container >
                    <div style={{ textAlign: "center" }}><h5 >Bio Data</h5></div>
                    <hr style={{width: "0mm", margin: "auto", marginBottom: "8mm"}}></hr>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Name
                        </Col>
                        <Col xs={6}>Example Name</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Father's / Husband's Name
                        </Col>
                        <Col xs={6}>Example Name</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Address
                        </Col>
                        <Col xs={6}> #1111, A road, B block, C Layout, Mysuru - 570001</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Mobile Number
                        </Col>
                        <Col xs={6}>0987654321</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Date of Birth
                        </Col>
                        <Col xs={6}>11-11-1990</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Age
                        </Col>
                        <Col xs={6}>30</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Sex
                        </Col>
                        <Col xs={6}>Male</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Caste 
                        </Col>
                        <Col xs={6}>Example text</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Marital Status
                        </Col>
                        <Col xs={6}>Married</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Languages
                        </Col>
                        <Col xs={6}>Kannada</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Education
                        </Col>
                        <Col xs={6}>SSLC</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Work Experience
                        </Col>
                        <Col xs={6}>3</Col>
                      </Row>
                    </Container>
                  <hr></hr>
                  <h6 style={{textAlign: "center" }}>Declaration</h6>
                  <p style={{textAlign: "center"}}>I confirm that the given above is true and complete to the best of my knowledge and belief.</p>
                  <div style={{fontWeight: "600"}} className="py-2">Date: </div>
                  <div style={{fontWeight: "600"}} className="py-2">Place: </div>
                  <div style={{fontWeight: "600"}} className="py-2 float-end">Yours Faithfully</div>
                  </Container>
                </Container>
              }
            </div>
          </PdfContainer>
        </div>

        <Row className="py-3">
          <Col xs={6}>
            <Button
              variant="success"
              onClick={() => {
                document.getElementById("pdf-generate").click();
              }}
            >
              Download
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button variant="danger" onClick={this.props.closeHandler}>
              Close
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
