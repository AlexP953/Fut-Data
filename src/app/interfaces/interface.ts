export interface Player {
    asistencias:number,
    games:number,
    goals:number,
    name:string,
    surname:string,
    birth:string,
    id:number,
    code:string,
    mail:string,
    mobile:number,
    mvp:number,
    isAdmin:boolean,
    image:string,
    mote:string,
    accessToken?:string,
    photoURL?:string,
    language:string,
    frase:string
}

export interface Goal {
    cantidad:number,
}

export interface Team {
    players:Player[]
}

export interface Partido {
    id:number,
    date:string,
    goals:Goal,
    teams:Team[],

}