import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import {Athlete} from './Athlete';

import {map} from 'rxjs/operators';
import {Cross} from './Cross';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private socket: Socket, private http: HttpClient) {
  }

  fetchAthletes() {
    return this.http.get('http://localhost:3333/api/athletes')
    // @ts-ignore
      .pipe(map(data => data.athletes));
  }

  fetchHistory(): Observable<Cross[]> {
    return this.http.get<{ [crosses: string]: Cross[] }>('http://localhost:3333/api/history')
      .pipe(map(data => data.crosses));
  }

  getEvent() {
    return this.socket
      .fromEvent('cross');
  }

  setDisabled() {
    this.socket.emit('stateChange', {active: false});
  }

  setEnabled() {
    this.socket.emit('stateChange', {active: true});
  }

  getReset() {
    return this.socket
      .fromEvent('reset');
  }
}
