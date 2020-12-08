import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;

const currentMovieId  = 24428
const currentMovieTitle = "The Avengers"
let movieId
const movie = {
  backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
  genres: [
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 28,
      name: "Action"
    }
  ],        id: 181808,
  original_language: "en",
  original_title: "Star Wars: The Last Jedi",
  overview:
    "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
  popularity: 44.208,
  poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  release_date: "2017-12-13",
  tagline: "Darkness rises... and light to meet it",
  title: "Star Wars: The Last Jedi",
  video: false,
  vote_average: 7,
  vote_count: 9692
};

describe("Movies endpoint", () => {
    describe("GET /movies ", () => {
      it("should return the 2 movies and a status 200", (done) => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body.movies).to.be.a("array");
            expect(res.body.movies.length).to.equal(2);
            const result = res.body.movies.map((movie) => movie.title);
            expect(result).to.have.members([
              "The Avengers",
              "Avengers: Age of Ultron",
            ]);
            done();
          });
      });
    });
    describe("GET /movies/:id", () => {
      describe("when the id is valid", () => {
        it("should return the matching movie", () => {
          return request(api)
            .get(`/api/movies/${currentMovieId}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("title", currentMovieTitle);
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return the NOT found message", () => {
          return request(api)
            .get("/api/movies/9999")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect({
              message: "Unable to find movie with id: 9999.",
              status: 404,
            });
        });
      });
    });
    describe("POST /movies ", () => {
      it("should return a 201 status and the newly added movie", () => {
        return request(api)
          .post("/api/movies")
          .send(movie)
          .expect(201)
          .then((res) => {
            expect(res.body.title).equals(movie.title);
            movieId = res.body.id;
          });
      });
      after(() => {
        return request(api)
          .get(`/api/movies/${movieId}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movie.title);
          });
      });
    });
    describe("PUT /movies ", () => {
      it("should return a copy of the updated movie", () => {
        return request(api)
          .put(`/api/movies/${movieId}`)
          .send(movie)
          .expect(200)
          .then((res) => {
            expect(res.body.title).equals(movie.title);
            movieId = res.body.id;
          });
      });
      it("should return the message:'Unable to find Movie'", () => {
        return request(api)
          .put("/api/movies/:id")
          .send(movie)
          .expect(404)
          .then((res) => {
            expect({
              message:'Unable to find Movie.',
            });
              
            movieId = res.body.id;
          });
      });
    });
});