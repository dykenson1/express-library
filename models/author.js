const mongoose = require("mongoose");
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;
const AuthorShema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorShema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name}, ${this.last_name}`;
  }
  return fullname;
});

AuthorShema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorShema.virtual("due_back_formatted").get(function () {
    return this.date_of_birth? DateTime.fromJSDate( this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  });

  AuthorShema.virtual("lifespan").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifetime_string;
});

AuthorShema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

AuthorShema.virtual("date_of_death_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});
AuthorShema.virtual("lifespan").get(function () {
    let lifetime_string = "";
    if (this.date_of_birth) {
      lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      );
    }
    lifetime_string += " - ";
    if (this.date_of_death) {
      lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
        DateTime.DATE_MED
      );
    }
    return lifetime_string;
  });
  
  AuthorShema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
  });
  
  AuthorShema.virtual("date_of_death_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
  });
module.exports = mongoose.model("Author", AuthorShema);
