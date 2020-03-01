import postgresql

def setup_db():
    db = postgresql.open('pq://jaepqgiknfxusg:b4e8b218b6bc4f51dace881f66de7ee7c226091fe387832bf396c81b33b9f576@ec2-54-197-234-117.compute-1.amazonaws.com:5432/d5m09jtp5iut3r')
    db.execute("create extension if not exists cube;")
    db.execute("drop table if exists vectors")
    db.execute("create table vectors (id serial, file varchar, vec_low cube, vec_high cube);")
    db.execute("create index vectors_vec_idx on vectors (vec_low, vec_high);")


setup_db()
