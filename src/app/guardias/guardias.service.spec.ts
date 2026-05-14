import { TestBed } from '@angular/core/testing';

import { GuardiasService } from './guardias.service';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { IGuardia, IServerResponse } from '../shared/entity.interfaces.js';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { authorizationInterceptor } from '../shared/interceptors/authorization.interceptor';

describe('GuardiasService', () => {
  let service: GuardiasService;
  let httpTesting: HttpTestingController;
  let mock_guardia1:IGuardia
  let mock_guardia2:IGuardia
  let httpClientSpy: HttpClient
  let mock_response:IServerResponse
  function doDate(date:string){return new Date(date  + "T00:00:00")}
  let id_test:string
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => authorizationInterceptor(req, next));


  beforeEach(() => {
    let http:HttpClient

    TestBed.configureTestingModule({
      providers: [
      GuardiasService,
      provideHttpClient(withInterceptors([interceptor])),
      provideHttpClientTesting()]
    });
    service = TestBed.inject(GuardiasService);
    httpTesting = TestBed.inject(HttpTestingController);
    mock_guardia1 =  {cod_guardia: 1,nombre: 'John',apellido: 'Deep',dni: 44332212,fecha_ini_contrato: doDate('2014-04-03'),fecha_fin_contrato: undefined}

  });
    afterEach(() => {httpTesting.verify()});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   it('service.getOne(id) shoud GET one guardia',async () => {
  const guardia_service$ = service.getOne('1');
  const servicePromise = firstValueFrom(guardia_service$);
 
  const req = httpTesting.expectOne('http://localhost:8080/guardias/1', 'Request to get one Guardia');
  expect(req.request.method).toBe('GET');
  req.flush(mock_guardia1);
  expect(await servicePromise).toEqual(mock_guardia1);

  })
   it('service.getAll() shoud GET all guardias',async () => {
    mock_guardia2 =  {cod_guardia: 2,nombre: 'Johnathan',apellido: 'Kent',dni: 453535,fecha_ini_contrato: doDate('2015-04-03'),fecha_fin_contrato: undefined}
    const mock_guardias: IGuardia[] = [mock_guardia1, mock_guardia2,];

    service.getAll().subscribe((guardias) => {
      expect(guardias.length).toBe(2);
      expect(guardias).toEqual(mock_guardias);
    });

  const req = httpTesting.expectOne('http://localhost:8080/guardias/', 'Request to get all Guardia');
  expect(req.request.method).toBe('GET');
  req.flush(mock_guardias);

  })

  it('service.putGuardia(id,guardia) should update(PUT) guardia',async () => {
    const mock_guardia_mod :IGuardia = {cod_guardia: 1,nombre: 'Carlos',apellido: 'Deep',dni: 44332212,fecha_ini_contrato: doDate('2014-04-03'),fecha_fin_contrato: doDate('2020-05-23')}
    const guardia_service$ = service.putGuardia(1,mock_guardia_mod);
    const servicePromise = firstValueFrom(guardia_service$);
    mock_response = {status:200}

    const req = httpTesting.expectOne('http://localhost:8080/guardias/1', 'Request to modify one Guardia');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mock_guardia_mod);
    
    req.flush(mock_response);
    expect(await servicePromise).toEqual(mock_response);
  })


     it('service.postGuardia(guardia) should POST a new guardia',async () => {
  const guardia_service$ = service.postGuardia(mock_guardia1);
  const servicePromise = firstValueFrom(guardia_service$);
    mock_response = {status:201}

  const req = httpTesting.expectOne('http://localhost:8080/guardias/', 'Request to POST one Guardia');
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(mock_guardia1);

  req.flush(mock_response);
  expect(await servicePromise).toEqual(mock_response);
  })

  it("Interceptor should add Autorization Bearer token to request header",async()=>{
    // GET ONE
    const guardia_service1$ = service.getOne('1');
  firstValueFrom(guardia_service1$);
    const req = httpTesting.expectOne('http://localhost:8080/guardias/1', 'Request to GET one Guardia');
    expect(req.request.headers.get('Authorization')).toContain('Bearer')

    // GET ALL
    const guardia_service2$ = service.getAll();
    firstValueFrom(guardia_service2$);
    const req2 = httpTesting.expectOne('http://localhost:8080/guardias/', 'Request to GET one Guardia');
    expect(req2.request.headers.get('Authorization')).toContain('Bearer')

    // PUT
    const mock_guardia_mod :IGuardia = {cod_guardia: 1,nombre: 'Carlos',apellido: 'Deep',dni: 44332212,fecha_ini_contrato: doDate('2014-04-03'),fecha_fin_contrato: doDate('2020-05-23')}
    const guardia_service3$ = service.putGuardia(1,mock_guardia_mod);
    firstValueFrom(guardia_service3$);
    const req3 = httpTesting.expectOne('http://localhost:8080/guardias/1', 'Request to modify one Guardia');
    expect(req3.request.headers.get('Authorization')).toContain('Bearer')
    
    // POST
    const guardia_service4$ = service.postGuardia(mock_guardia1);
    firstValueFrom(guardia_service4$);
    const req4 = httpTesting.expectOne('http://localhost:8080/guardias/', 'Request to POST one Guardia');
    expect(req4.request.headers.get('Authorization')).toContain('Bearer')
 
  })



})
