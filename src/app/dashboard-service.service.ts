import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import {Athlete} from './Athlete';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  athletes: Athlete[];


  constructor(private socket: Socket, private http: HttpClient) {
  }

  fetchAthletes() {
    return this.http.get('http://localhost:3333/api/athletes');
  }

  fetchHistory() {
    return this.http.get('http://localhost:3333/api/history');
  }

  setDisabled() {
    this.socket.emit('statusChange', {active: false});
  }

  setEnabled() {
    this.socket.emit('statusChange', {active: true});
  }

}
