import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {Subscription} from 'rxjs';
import {Athlete} from '../Athlete';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private eventSub: Subscription;
  private resetSub: Subscription;

  private athletes: Athlete[];

  constructor(private dashboardService: DashboardService) {
  }


  ngOnInit() {
    this.athletes = [];
    this.eventSub = this.dashboardService.getEvent().subscribe(event => {
      this.applyEventToAthlete(event);
    });

    this.resetSub = this.dashboardService.getReset().subscribe(() => {
      this.athletes.forEach(athlete => {
        athlete.corridorEvent = null;
        athlete.finishEvent = null;
      });
    });

    this.dashboardService.fetchAthletes().subscribe(athletes => {
      this.athletes = athletes;
      this.mapHistory();
    });
  }

  get athleteData() {
    return this.athletes.filter(athlete => !!athlete.corridorEvent);
  }

  mapHistory() {
    this.dashboardService.fetchHistory().subscribe(crosses => {
      crosses.forEach(cross => {
        this.applyEventToAthlete(cross);
      });
    });
  }

  applyEventToAthlete(cross) {
    const filteredAthletes = this.athletes.filter(athlete => athlete.id === cross.athleteId);
    if (filteredAthletes.length === 1) {
      if (cross.event === 'corridor_entered') {
        filteredAthletes[0].corridorEvent = cross;
      }
      if (cross.event === 'finish_entered') {
        filteredAthletes[0].finishEvent = cross;
      }
    }
  }

  ngOnDestroy() {
    this.eventSub.unsubscribe();
  }
}
