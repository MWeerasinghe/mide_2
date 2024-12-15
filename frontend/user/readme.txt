CREATE TABLE lib_staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user_lib_staff FOREIGN KEY (user_id)
        REFERENCES public."Users" (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

___________________________________________________________________________________


CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user_admin FOREIGN KEY (user_id)
        REFERENCES public."Users" (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

__________________________________________________________________________________

CREATE TABLE dham_teacher (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

__________________________________________________________________________________

CREATE TABLE dham_staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

__________________________________________________________________________________


