CREATE TABLE users (
	user_id int AUTO_INCREMENT PRIMARY KEY,
    user_name varchar(255),
    user_email varchar(255),
    user_avt varchar(255),
    user_gt varchar(10),
    user_password varchar(255),
    user_phone varchar(255),
    user_address varchar(255),
    user_create DATETIME,
    user_update DATETIME
);

CREATE TABLE chuc_vu (
	cv_id int AUTO_INCREMENT PRIMARY KEY,
    cv_name varchar(255),
    cv_luong double
);

CREATE TABLE nhan_vien (
	nv_id int AUTO_INCREMENT PRIMARY KEY,
    nv_email varchar(255),
    nv_password varchar(255),
    nv_hoten varchar(255),
    nv_avt varchar(255),
    nv_phone varchar(255),
    nv_adress varchar(255),
    nv_gt varchar(10),
    cv_id int,
    nv_status boolean,
    nv_create DATETIME,
    nv_update DATETIME
);

CREATE TABLE product (
    sp_id int AUTO_INCREMENT PRIMARY KEY,
    sp_code varchar(50) UNIQUE,
    sp_name varchar(255),
    sp_price double,
    sp_image varchar(255),
    sp_describe varchar(255),
    sp_sl int,
    sp_xuatxu varchar(255),
    cate_id int,
    sp_gianhap double,
    sp_status int(3) DEFAULT 0,
    nv_id int,
    sp_create DATETIME,
    sp_update DATETIME
);

CREATE TABLE cate(
    cate_id int AUTO_INCREMENT PRIMARY KEY,
    cate_name varchar(255),
    cate_status int(3) DEFAULT 0,
    cate_create DATETIME,
    cate_update DATETIME
);

CREATE TABLE phieu_nhap(
    pn_id int AUTO_INCREMENT PRIMARY KEY,
    pn_total double,
    nv_id int,
    sp_code varchar(50), 
    pn_create DATETIME,
    pn_update DATETIME
);

CREATE TABLE ctpnhap(
    ctpn_id int AUTO_INCREMENT PRIMARY KEY,
    pn_id int,
    sp_code varchar(50),
    ctpn_sl int,
    ctpn_gianhap double,
    ctpn_create DATETIME,
    ctpn_update DATETIME
);

CREATE TABLE ctsp (
	ctsp_id int AUTO_INCREMENT PRIMARY KEY,
    sp_code varchar(50),
    ctsp_note varchar(255),
    ctsp_wieght varchar(50),
    ctsp_tphan varchar(50),
    ctsp_create DATETIME,
    ctsp_update DATETIME
);

CREATE TABLE ctdh(
	ctdh_id int AUTO_INCREMENT PRIMARY KEY,
    sp_code varchar(50),
    ctdh_sl int,
    ctdh_create DATETIME,
    ctdh_update DATETIME
);

CREATE TABLE donhang (
	dh_id int AUTO_INCREMENT PRIMARY KEY,
    dh_pay varchar(255),
    dh_status int(3) DEFAULT 0,
    dh_total double,
    sp_code varchar(50),
    kh_id int,
    nv_id int,
    dh_create DATETIME,
    dh_update DATETIME
);

CREATE TABLE comments(
    bl_id int AUTO_INCREMENT PRIMARY KEY,
    bl_content varchar(255),
    sp_id int,
    kh_id int,
    bl_create DATETIME,
    bl_update DATETIME
);

CREATE TABLE cart(
    gh_id int AUTO_INCREMENT PRIMARY KEY,
    kh_id int,
    sp_code varchar(50),
    gh_create DATETIME,
    gh_update DATETIME
);

CREATE TABLE dchiNhanHang(
    dcnh_id int AUTO_INCREMENT PRIMARY KEY,
    kh_id int,
    dcnh_adress varchar(255),
    dcnh_create DATETIME,
    dcnh_update DATETIME
);


CREATE TABLE feedbacks(
    lh_id int AUTO_INCREMENT PRIMARY KEY,
    lh_status int(3),
    lh_name varchar(255),
    lh_email varchar(255),
    lh_sdt varchar(255),
    lh_conten varchar(255),
    lh_address varchar(255),
    lh_create DATETIME,
    lh_update DATETIME,
    lh_img varchar(255)
);

CREATE TABLE pet(
    p_id int AUTO_INCREMENT PRIMARY KEY,
    p_des varchar(255),
    cate_id int,
    p_img varchar(255),
    kh_id int,
    p_create DATETIME,
    p_status int(3) DEFAULT 0,
    p_s_detail varchar(255),
    p_s_fee double,
    p_s_date DATETIME,
    p_update DATETIME
);

ALTER TABLE nhan_vien
ADD FOREIGN KEY (cv_id) REFERENCES chuc_vu(cv_id);

ALTER TABLE product RENAME TO products;

ALTER TABLE products
ADD FOREIGN KEY (cate_id) REFERENCES cate(cate_id);

ALTER TABLE products
ADD FOREIGN KEY (nv_id) REFERENCES nhan_vien(nv_id);

ALTER TABLE phieu_nhap
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE phieu_nhap
ADD FOREIGN KEY (nv_id) REFERENCES nhan_vien(nv_id);

ALTER TABLE ctpnhap
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE ctpnhap
ADD FOREIGN KEY (pn_id) REFERENCES phieu_nhap(pn_id);

ALTER TABLE ctsp
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE ctdh
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE donhang
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE donhang
ADD FOREIGN KEY (kh_id) REFERENCES users(user_id);

ALTER TABLE donhang
ADD FOREIGN KEY (nv_id) REFERENCES nhan_vien(nv_id);

ALTER TABLE cart
ADD FOREIGN KEY (kh_id) REFERENCES users(user_id);

ALTER TABLE cart
ADD FOREIGN KEY (sp_code) REFERENCES products(sp_code);

ALTER TABLE dchiNhanHang
ADD FOREIGN KEY (kh_id) REFERENCES users(user_id);

ALTER TABLE pet 
ADD FOREIGN KEY (cate_id) REFERENCES cate(cate_id);

ALTER TABLE pet 
ADD FOREIGN KEY (kh_id) REFERENCES users(user_id);

ALTER TABLE cate
ADD cate_img varchar(255);

ALTER TABLE nhan_vien
ADD nv_date varchar(255);

ALTER TABLE cate ADD c_status TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE users
ADD UNIQUE (user_name);


ALTER TABLE comments ADD bl_status int(3) DEFAULT 0

ALTER TABLE products ADD sp_detail varchar(255)
ALTER TABLE products ADD sp_note varchar(255)
ALTER TABLE feedbacks ADD lh_image varchar(255)
ALTER TABLE feedbacks ADD lh_ph varchar(255)
ALTER TABLE donhang ADD gh_id int

ALTER TABLE donhang 
ADD FOREIGN KEY (gh_id) REFERENCES cart(gh_id);
ALTER TABLE donhang ADD dh_sl int
ALTER TABLE cart ADD gh_sl int
ALTER TABLE pet ADD p_name varchar(255)
-- ALTER TABLE donhang ADD ctdh_id int
-- ALTER TABLE donhang ADD FOREIGN KEY (ctdh_id) REFERENCES ctdh(ctdh_id)
ALTER TABLE ctdh ADD FOREIGN KEY (dh_id) REFERENCES donhang(dh_id)
CREATE TABLE service (
	service_id int AUTO_INCREMENT PRIMARY KEY,
    service_name varchar(255),
    service_price int,
    service_des varchar(255)
);

ALTER TABLE pet DROP COLUMN p_des
ALTER TABLE pet ADD service_id int
ALTER TABLE pet ADD FOREIGN KEY (service_id) REFERENCES service(service_id)

INSERT INTO service (service_name, service_price, service_des) VALUES 
('spa', 50, 'cleaning, grooming, and nail cutting for pets'),
('vaccinate', 70, 'vaccinate pets'),
('medical', 100,'medical for pets');

--xem khoa ngoai
SELECT 
  constraint_name,
  table_name,
  column_name,
  referenced_table_name,
  referenced_column_name
FROM
  information_schema.key_column_usage
WHERE
  table_schema = 'petshop3';
  ALTER TABLE ctdh ADD dh_id int

  ALTER TABLE cart ADD status int(3) DEFAULT 0
  ALTER TABLE donhang ADD dh_address varchar(255)
  --drop table dchinhanhang
--   ALTER TABLE donhang
-- DROP FOREIGN KEY donhang_ibfk_4;
-- INSERT into admin (admin_name, admin_password) VALUES ("admin","admin"); 
ALTER TABLE ctdh ADD sp_price double
ALTER TABLE comments ADD b_status tinyint(1) DEFAULT 0
ALTER TABLE users ADD user_status int(3) DEFAULT 0

INSERT INTO chuc_vu (cv_name, cv_luong) VALUES 
('admin', 9000000),
('nhân viên', 6000000);

