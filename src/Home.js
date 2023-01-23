import React, { useEffect } from "react";
import "./App.css";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <main className="my-form">
        <div className="container align-center col-sm-8">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card border-light w-auto special-card">
                <div className="card-header border-light text-center">
                  Search Flights
                </div>
                <div className="card-body">
                  <form name="searchFlightsForm" method="post" role="form">
                    <div className="row searchForm">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-md-2 col-sm-3 col-sm-12 ">
                            <input
                              className="form-control"
                              id="origin"
                              name="origin"
                              placeholder="Origin"
                              type="text"
                            />
                          </div>
                          <div className="col-sm-2 col-md-3 col-sm-12">
                            <input
                              className="form-control"
                              id="destination"
                              name="destination"
                              placeholder="Destination"
                              type="text"
                            />
                          </div>
                          <div className="col-sm-2 col-md-3 col-sm-12 ">
                            <input
                              type="date"
                              id="date"
                              className="form-control search-slt"
                              placeholder="Travel Date"
                            />
                          </div>
                          <div className="col-sm-2 col-md-3 col-sm-12">
                            <button type="submit" className="btn btn-primary">
                              Search Flight
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
