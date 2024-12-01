--
-- PostgreSQL database dump
--

-- Dumped from database version 14.14 (Debian 14.14-1.pgdg120+1)
-- Dumped by pg_dump version 14.14 (Debian 14.14-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: zeus
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    landline character varying(255),
    gender character varying(255),
    nic character varying(255),
    dob date,
    address character varying(255),
    name character varying(255),
    mobile character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO zeus;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: zeus
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO zeus;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zeus
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: dham_student; Type: TABLE; Schema: public; Owner: zeus
--

CREATE TABLE public.dham_student (
    id integer NOT NULL,
    user_id integer NOT NULL,
    full_name character varying NOT NULL,
    surname_english character varying NOT NULL,
    initials character varying NOT NULL,
    school_grade character varying NOT NULL,
    class character varying NOT NULL,
    school character varying NOT NULL,
    dhamma_grade character varying NOT NULL,
    profile_img character varying,
    nic_img character varying NOT NULL,
    start_date date NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dham_student OWNER TO zeus;

--
-- Name: dham_student_id_seq; Type: SEQUENCE; Schema: public; Owner: zeus
--

CREATE SEQUENCE public.dham_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dham_student_id_seq OWNER TO zeus;

--
-- Name: dham_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zeus
--

ALTER SEQUENCE public.dham_student_id_seq OWNED BY public.dham_student.id;


--
-- Name: lib_member_open; Type: TABLE; Schema: public; Owner: zeus
--

CREATE TABLE public.lib_member_open (
    id integer NOT NULL,
    user_id integer NOT NULL,
    school character varying(255) NOT NULL,
    id_img character varying(255) NOT NULL,
    confirm_letter character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.lib_member_open OWNER TO zeus;

--
-- Name: lib_member_open_id_seq; Type: SEQUENCE; Schema: public; Owner: zeus
--

CREATE SEQUENCE public.lib_member_open_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lib_member_open_id_seq OWNER TO zeus;

--
-- Name: lib_member_open_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zeus
--

ALTER SEQUENCE public.lib_member_open_id_seq OWNED BY public.lib_member_open.id;


--
-- Name: lib_member_student; Type: TABLE; Schema: public; Owner: zeus
--

CREATE TABLE public.lib_member_student (
    id integer NOT NULL,
    user_id integer NOT NULL,
    stu_id character varying(255) NOT NULL,
    school character varying(255) NOT NULL,
    nic_img character varying(255) NOT NULL,
    dham_id_img character varying(255) NOT NULL,
    teacher_letter character varying(255) NOT NULL,
    parent_letter character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.lib_member_student OWNER TO zeus;

--
-- Name: lib_member_student_id_seq; Type: SEQUENCE; Schema: public; Owner: zeus
--

CREATE SEQUENCE public.lib_member_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lib_member_student_id_seq OWNER TO zeus;

--
-- Name: lib_member_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zeus
--

ALTER SEQUENCE public.lib_member_student_id_seq OWNED BY public.lib_member_student.id;


--
-- Name: lib_member_thero; Type: TABLE; Schema: public; Owner: zeus
--

CREATE TABLE public.lib_member_thero (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name_of_teacher character varying NOT NULL,
    learning_place character varying NOT NULL,
    nic_img character varying NOT NULL,
    recomond_letter character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lib_member_thero OWNER TO zeus;

--
-- Name: lib_member_thero_id_seq; Type: SEQUENCE; Schema: public; Owner: zeus
--

CREATE SEQUENCE public.lib_member_thero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lib_member_thero_id_seq OWNER TO zeus;

--
-- Name: lib_member_thero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zeus
--

ALTER SEQUENCE public.lib_member_thero_id_seq OWNED BY public.lib_member_thero.id;


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: dham_student id; Type: DEFAULT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.dham_student ALTER COLUMN id SET DEFAULT nextval('public.dham_student_id_seq'::regclass);


--
-- Name: lib_member_open id; Type: DEFAULT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_open ALTER COLUMN id SET DEFAULT nextval('public.lib_member_open_id_seq'::regclass);


--
-- Name: lib_member_student id; Type: DEFAULT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_student ALTER COLUMN id SET DEFAULT nextval('public.lib_member_student_id_seq'::regclass);


--
-- Name: lib_member_thero id; Type: DEFAULT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_thero ALTER COLUMN id SET DEFAULT nextval('public.lib_member_thero_id_seq'::regclass);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: zeus
--

COPY public."Users" (id, email, password, landline, gender, nic, dob, address, name, mobile, "createdAt", "updatedAt") FROM stdin;
2	chamika@gmail.com	$2a$10$JtG7NGlsR4p79S6jPe0mMulpXHXgPLEhKm.hMCXJxyD59hna7qWRK	0411234567	Male	123456789V	1990-05-10	123 Example Street, Colombo	Ishan Chamika	0771234567	2024-11-30 06:03:48.139+00	2024-11-30 06:03:48.139+00
1	cha@gmail.com	$2a$10$cwam.ubqoFCP.b04BvHGfuA5YGBnuEOG6a2NU0RZPHKwDtMq..PQu	\N	\N	\N	\N	\N	Senanayake	\N	2024-11-30 05:42:25.217+00	2024-11-30 20:39:33.243+00
\.


--
-- Data for Name: dham_student; Type: TABLE DATA; Schema: public; Owner: zeus
--

COPY public.dham_student (id, user_id, full_name, surname_english, initials, school_grade, class, school, dhamma_grade, profile_img, nic_img, start_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: lib_member_open; Type: TABLE DATA; Schema: public; Owner: zeus
--

COPY public.lib_member_open (id, user_id, school, id_img, confirm_letter, "createdAt", "updatedAt") FROM stdin;
3	1	Tissamaharama	ok	ok	2024-11-30 05:42:25.217+00	2024-11-30 05:42:25.217+00
\.


--
-- Data for Name: lib_member_student; Type: TABLE DATA; Schema: public; Owner: zeus
--

COPY public.lib_member_student (id, user_id, stu_id, school, nic_img, dham_id_img, teacher_letter, parent_letter, "createdAt", "updatedAt") FROM stdin;
1	2	sdfdsf	Matara	ofdfs	noimg	ok	ok	2024-11-30 05:42:25.217+00	2024-11-30 05:42:25.217+00
\.


--
-- Data for Name: lib_member_thero; Type: TABLE DATA; Schema: public; Owner: zeus
--

COPY public.lib_member_thero (id, user_id, name_of_teacher, learning_place, nic_img, recomond_letter, created_at, updated_at) FROM stdin;
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zeus
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- Name: dham_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zeus
--

SELECT pg_catalog.setval('public.dham_student_id_seq', 1, false);


--
-- Name: lib_member_open_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zeus
--

SELECT pg_catalog.setval('public.lib_member_open_id_seq', 3, true);


--
-- Name: lib_member_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zeus
--

SELECT pg_catalog.setval('public.lib_member_student_id_seq', 1, true);


--
-- Name: lib_member_thero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zeus
--

SELECT pg_catalog.setval('public.lib_member_thero_id_seq', 1, false);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: dham_student dham_student_pkey; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.dham_student
    ADD CONSTRAINT dham_student_pkey PRIMARY KEY (id);


--
-- Name: lib_member_open lib_member_open_pkey; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_open
    ADD CONSTRAINT lib_member_open_pkey PRIMARY KEY (id);


--
-- Name: lib_member_student lib_member_student_pkey; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_student
    ADD CONSTRAINT lib_member_student_pkey PRIMARY KEY (id);


--
-- Name: lib_member_thero lib_member_thero_pkey; Type: CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_thero
    ADD CONSTRAINT lib_member_thero_pkey PRIMARY KEY (id);


--
-- Name: dham_student dham_student_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.dham_student
    ADD CONSTRAINT dham_student_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lib_member_open lib_member_open_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_open
    ADD CONSTRAINT lib_member_open_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lib_member_student lib_member_student_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_student
    ADD CONSTRAINT lib_member_student_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lib_member_thero lib_member_thero_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zeus
--

ALTER TABLE ONLY public.lib_member_thero
    ADD CONSTRAINT lib_member_thero_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

