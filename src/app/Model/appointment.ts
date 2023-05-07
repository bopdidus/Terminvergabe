export class Appointment{
    subject: String;
    startAt: Date;
    state:STATUS

    constructor(_subject:String, _startAt: Date)
    {
        this.subject = _subject
        this.startAt = _startAt
        this.state = STATUS.AGRRE
    }

    asDTO()
    {
        return {
           "subject": this.subject,
            "startAt": this.startAt.getTime(),
            "endAt": new Date().setMinutes(this.startAt.getMinutes()+45),
            "state":this.state
        };
    }
}

export enum STATUS{
    AGRRE = 0,
    CANCEL= 1,
}