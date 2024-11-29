import React from "react";
import {Modal, Image, Button} from "react-bootstrap";
// @ts-ignore
import a1src from './images/a1.png';
// @ts-ignore
import a2src from './images/a2.png';
// @ts-ignore
import a2_1src from './images/a2-1.png';
// @ts-ignore
import a3src from './images/a3.png';
// @ts-ignore
import a4src from './images/a4.png';
// @ts-ignore
import a5src from './images/a5.png';
// @ts-ignore
import a6src from './images/a6.png';


interface IHowToGetReportModalProps {
    show: boolean;
    hide:()=>void;
}

function HowToGetReportModal({show, hide}: IHowToGetReportModalProps) {

    return (
        <Modal show={show} size={"lg"} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>איך להוריד דו"ח מאתר חברת החשמל</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <section>
                        <div>
                            נכנסים לאתר חברת החשמל בכתובת:
                            <a style={{paddingRight: '5px'}} href={'https://iec.co.il/home'}
                               target={'_blank'}>https://iec.co.il/home</a>
                            <div>באתר של חברת החשמל נכנסים לאיזור האישי</div>
                        </div>
                        <Image src={a1src}></Image>
                    </section>
                    <section>
                        <div>אם בצד שמאל של המסך לא מופיעות חשבוניות צריך להוסיף את המונה לחשבון דרך התפריט</div>
                        <div>בצד שמאל למעלה ללחוץ על השם ולבחור "הוספת חשבון"</div>
                        <Image src={a2_1src}></Image>
                        <div>כאשר בצד שמאל של המסך מופיעות החשבוניות של המונה החכם יש לבחור "עוד פעולות"</div>
                        <Image src={a2src}></Image>
                    </section>
                    <section>
                        <div>
                            <div>ושוב עוד פעולות</div>
                            <Image src={a3src}></Image>
                        </div>
                    </section>
                    <section>
                        <div>כעת לבחור ב"נתוני הצריכה שלך"</div>
                        <Image src={a4src}></Image>
                    </section>
                    <section>
                        <div>ולבסוף "מצב צריכה עדכני"</div>
                        <Image src={a5src}></Image>
                    </section>
                    <section>
                        <div>כעת למטה תופיע האפשרות לקבל את הדו"ח באימייל, יש לבחור את האפשרות הזאת ולחכות שהדו"ח יגיע, זה יכול לקחת כמה שעות</div>
                        <Image src={a6src}></Image>
                    </section>
                    <Button onClick={hide}>סגור את ההוראות</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default HowToGetReportModal;