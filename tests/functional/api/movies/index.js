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
});