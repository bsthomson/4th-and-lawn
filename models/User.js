const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    validate: {
      validator: v => {
        return /.+?@.+?\w{2,3}/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: v => {
        return /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).*$/.test(v);
      },
      message: props => `${props.value} is not a valid password`
    }
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    validator: v => {
      return /^[0-9]{10}$/.test(v);
    },
    message: props => `${props.value} is not a valid phonenumber`
  },
  rentinfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Renter"
    }
  ],
  rentedspots: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingSpot"
    }
  ],
  parkingspots: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingSpot"
    }
  ]
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next (err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = (candidatePassword) => {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
