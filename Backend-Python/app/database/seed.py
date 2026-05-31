from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models.role_model import Role
from app.models.user_model import User
from app.models.category_model import Category
from app.models.product_model import Product


def seed_database(db: Session):
    if db.query(Role).count() > 0:
        return

    admin_role = Role(rol="Administrador")
    user_role = Role(rol="Usuario")
    db.add_all([admin_role, user_role])
    db.flush()

    users = [
        User(
            user_name="Administrador", user_lastname="Admin",
            email="admin@gmail.com", password=hash_password("123456"),
            rol_id=admin_role.id,
        ),
        User(
            user_name="Usuario", user_lastname="User",
            email="user@gmail.com", password=hash_password("123456"),
            rol_id=user_role.id,
        ),
        User(
            user_name="Juan René", user_lastname="Ixcopal",
            email="juan.ixcopal@gmail.com", password=hash_password("123456"),
            rol_id=admin_role.id,
        ),
        User(
            user_name="usuario", user_lastname="1",
            email="usuario1@gmail.com", password=hash_password("123456"),
            rol_id=user_role.id,
        ),
        User(
            user_name="Gaby", user_lastname="Flores",
            email="gaby.flores@gmail.com", password=hash_password("123456"),
            rol_id=user_role.id,
        ),
    ]
    db.add_all(users)
    db.flush()

    categories = [
        Category(product="Blusas", gender="Mujer"),
        Category(product="Pantalones", gender="Mujer"),
        Category(product="Calzado", gender="Mujer"),
        Category(product="Camisas", gender="Hombre"),
        Category(product="Pantalones", gender="Hombre"),
        Category(product="Calzado", gender="Hombre"),
    ]
    db.add_all(categories)
    db.flush()

    blusas_m, pant_m, calz_m, cam_h, pant_h, calz_h = categories

    products = [
        Product(name="Camisa uno", description="Camisa de cuadros", price=20, stock=80,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665038/reniel_store/products/otn92mckbgdoyvvmzlkp.jpg",
                category_id=cam_h.id),
        Product(name="Camisa blanca", description="Que fachero se ve el tipo", price=40, stock=9,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665610/reniel_store/products/cddfrpvfnnf1eminvwf8.jpg",
                category_id=cam_h.id),
        Product(name="Sudadera", description="Una bonita sudadera", price=25, stock=8,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762699591/reniel_store/products/x8xq2tfbu9cln5zm7fy5.webp",
                category_id=cam_h.id),
        Product(name="Pantalones 2", description="Otros pantalones", price=30, stock=4,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665210/reniel_store/products/dgqkuqczbmyfly9lfu6r.jpg",
                category_id=pant_h.id),
        Product(name="Pantalones facheros", description="Me gusta esta ropa", price=25, stock=6,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665702/reniel_store/products/lcnyqtfe2ljy2bquv5aq.jpg",
                category_id=pant_h.id),
        Product(name="Otros pantalones", description="Otros pantalones para hombre", price=80, stock=10,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665645/reniel_store/products/u2l1mhmlnkws3ugli5ec.jpg",
                category_id=pant_h.id),
        Product(name="Zapatitos", description="Unos zapatitos", price=60, stock=8,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665727/reniel_store/products/k08hc5erlbdqo3igxfzp.jpg",
                category_id=calz_h.id),
        Product(name="Unas botas", description="Unas bonitas botas", price=40, stock=7,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665327/reniel_store/products/hstrfxsgg9xxzemvkbmb.jpg",
                category_id=calz_m.id),
        Product(name="Unas botitas", description="Otras botitas", price=50, stock=5,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665356/reniel_store/products/duqmne60matpasdyrctj.jpg",
                category_id=calz_m.id),
        Product(name="Blusa dorada", description="Una blusa muy dorada", price=40, stock=6,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665754/reniel_store/products/xnkir6lbloxywgntnn0q.jpg",
                category_id=blusas_m.id),
        Product(name="Una blusa azul", description="Una blusa muy azul", price=70, stock=8,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665779/reniel_store/products/ulmnrtyw7ywf08g24ma6.jpg",
                category_id=blusas_m.id),
        Product(name="Pantalones negros", description="Unos pantalones facheros", price=30, stock=8,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665574/reniel_store/products/ozx57zsfvgtknvx1w0ho.jpg",
                category_id=pant_m.id),
        Product(name="Pantalones de mujer 1", description="Unos pantalones bonitos", price=60, stock=10,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762665397/reniel_store/products/nmaaf5g1kygkpstys916.jpg",
                category_id=pant_m.id),
        Product(name="Pantalones facheros 2", description="Unos pantalones facheros", price=25, stock=7,
                image="https://res.cloudinary.com/drch5a3kf/image/upload/v1762728435/reniel_store/products/g4so8cx1jzexno57l44t.webp",
                category_id=pant_m.id),
    ]
    db.add_all(products)
    db.commit()
    print("Base de datos inicializada con datos de ejemplo.")
