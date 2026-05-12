export interface IGuardia {
  cod_guardia?: number,
  nombre: string,
  apellido: string,
  dni: number,
  fecha_ini_contrato: Date,
  fecha_fin_contrato?: Date,
  turnos?: ITurno[];
}

export interface IRecluso {
    cod_recluso?:  number,
    nombre:    string;
    apellido:  string;
    dni:       number;
    fecha_nac: Date;
    condenas?: ICondena[];
    penas?: IPena[];
    pena?: IPena;
    actividades?:IActividad[];
}
export interface IActividad{
    cod_actividad?:    number;
    nombre:           string;
    descripcion:      string;
    dia_de_la_semana: string;
    hora_inicio:      string;
    hora_fin:         string;
    cod_sector:         string;
    cant_cupos:       number;
    reclusos?:         IRecluso[];   
}

export interface ICondena {
  nro_condena?: number,
  nombre:   string, 
  descripcion?:    string,
  duracion_anios: number,
  duracion_meses: number,
  duracion_dias: number,
  pena?:IPena
  //orden_de_gravedad: number
}

export interface IPena{
    cod_recluso?: IRecluso['cod_recluso'],
    recluso?:IRecluso,
    fecha_ini:    Date,
    fecha_fin_estimada?:   Date,
    fecha_fin_real?:   Date,
    condenas?: ICondena[];
}

export interface ICelda {
    cod_celda: number,
    sector: ISector,
    descripcion:  string, 
    capacidad:  number
  }

export interface ISector{
    cod_sector:   string;
    nombre:   string;
    descripcion:  string;
    habilitado: boolean;
    turnos ?: ITurno[];
  }

export interface ITurno{
    cod_turno?:number
    fecha:   string,
    tipo_turno:  string,
    sector?:ISector;
    guardia?:IGuardia;
    cod_sector?:string;
    cod_guardia?:number;
  }

  export interface IServerResponse{
    status:number,
    data?:any,
    message?:string,
    token?:string
  }
