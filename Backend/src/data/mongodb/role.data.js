export default function makeRoleData({ Rol }) {
    return Object.freeze({
      findAll,
      findByName,
      create
    });
  
    async function findAll() {
      return Rol.find();
    }
  
    async function findByName(rol) {
      return Rol.findOne({ rol });
    }
  
    async function create(rol) {
      
      const role = new Rol({ rol });
      return role.save();
    }
  }
  