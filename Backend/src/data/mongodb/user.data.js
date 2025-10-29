export default function makeUserData({ User, Rol }) {
    return Object.freeze({
      findAll,
      findByEmail,
      createUser
    });
  
    async function findAll() {
      return User.find().populate("rol_id", "rol");
    }
  
    async function findByEmail(email) {      
      return User.findOne({ email }).populate("rol_id", "rol");
    }

    async function createUser(params) {
      const {user_name, user_lastname, email, hash_pass, rol} = params
      const role = await Rol.findOne({ rol });

      const usuario = new User({
        user_name,
        user_lastname,
        email,
        password: hash_pass,
        rol_id: role._id
      });

      return usuario.save();
    }
  }
  