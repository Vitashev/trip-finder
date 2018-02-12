import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SearchService {

  constructor() {}

  public getShortestPath(edges, source, target) {

    const Q = new Set(),
      prev = {},
      dist = {},
      adj = {}

    for (let i = 0; i < edges.length; i++) {
      let v1 = edges[i][0],
        v2 = edges[i][1],
        len = edges[i][2];

      Q.add(v1);
      Q.add(v2);

      dist[v1] = Infinity;
      dist[v2] = Infinity;

      if (adj[v1] === undefined) adj[v1] = {}
      if (adj[v2] === undefined) adj[v2] = {}

      adj[v1][v2] = len;
      adj[v2][v1] = len;
    }

    dist[source] = 0

    while (Q.size) {
      let u = this.vertexWithMinDist(Q, dist);
      let neighbors = Object.keys(adj[u]).filter(v => Q.has(v)); //Neighbor still in Q

      Q.delete(u);

      if (u === target) break //Break when the target has been found

      for (let v of neighbors) {
        let alt = dist[u] + adj[u][v];
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }

    {
      let u = target,
        S = [u],
        len = 0;

      while (prev[u] !== undefined) {
        S.unshift(prev[u])
        len += adj[u][prev[u]]
        u = prev[u]
      }
      return [S, len]
    }
  }

  public getSearchParams(tripsList) {
    return tripsList.reduce((result, current) => {
      if (result.departure.indexOf(current.departure) === -1) {
        result.departure = [...result.departure, current.departure];
      }
      if (result.arrival.indexOf(current.arrival) === -1) {
        result.arrival = [...result.arrival, current.arrival];
      }
      return result;
    }, {
      departure: [],
      arrival: []
    });
  }

  public getCheapestTrip(tripsList, pathes) {
    return pathes.reduce((result, current, index, array) => {

      if (index < array.length - 1) {
        let findCheapest = _.minBy(tripsList.filter(item => {
          return item.departure === current && item.arrival === array[index + 1];
        }), (el) => {
          return el.cost;
        });

        result.list.push(findCheapest);
        result.totalDuration = result.totalDuration + this.getDurationInMinutes(findCheapest.duration);
        result.totalCost = result.totalCost + findCheapest.cost;
      }

      return result;
    }, {list: [], totalDuration: 0, totalCost: 0});
  }

  public getFastestTrip(tripsList, pathes) {
    return pathes.reduce((result, current, index, array) => {

      if (index < array.length - 1) {
        let findFastest = _.minBy(tripsList.filter(item => {
          return item.departure === current && item.arrival === array[index + 1];
        }), (el) => {
          return this.getDurationInMinutes(el.duration);
        });

        result.list.push(findFastest);
        result.totalDuration = result.totalDuration + this.getDurationInMinutes(findFastest.duration);
        result.totalCost = result.totalCost + findFastest.cost;
      }

      return result;
    }, {list: [], totalDuration: 0, totalCost: 0});
  }

  public getPathes(tripsList) {
    return tripsList.reduce((result, current) => {

      this.getPathesByCost(result, current)
      this.getPathesByDuration(result, current);

      return result;
    }, {cheapest: [], fastest: []});
  }

  private getPathesByCost(result, current) {

    let index = _.findIndex(result.cheapest, item => {
      return item[0] === current.departure && item[1] === current.arrival;
    });

    if (index !== -1 && current.cost < result.cheapest[index][2]) {
      result.cheapest[index][2] = current.cost;
    } else if (index === -1) {
      result.cheapest = [...result.cheapest, [current.departure, current.arrival, current.cost]]
    }
  }

  private getPathesByDuration(result, current) {
    let index = _.findIndex(result.fastest, item => {
      return item[0] === current.departure && item[1] === current.arrival;
    });

    let duration = this.getDurationInMinutes(current.duration);

    if (index !== -1 && duration < result.fastest[index][2]) {
      result.fastest[index][2] = duration;
    } else if (index === -1) {
      result.fastest = [...result.fastest, [current.departure, current.arrival, duration]]
    }
  }

  private getDurationInMinutes(duration) {
    return parseInt(duration.h) * 60 + parseInt(duration.m);
  }

  private vertexWithMinDist(Q, dist) {

    let minDistance = Infinity, u = null;

    Q.forEach(v => {
      if (dist[v] < minDistance) {
        minDistance = dist[v];
        u = v;
      }
    });

    return u;
  }


}
