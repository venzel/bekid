--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE bekid;




--
-- Drop roles
--

DROP ROLE bekid;


--
-- Roles
--

CREATE ROLE bekid;
ALTER ROLE bekid WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:JhHx507WbSoVcQmJZXyaiA==$AhWk3D+Yo+cpCRGqzZpHiDLInQtD9/2ck/BhxM9eQzc=:0hK6rt3Y0pakt+GU5KWqzl7OpJh6dolZE1PV9Bw5Jww=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: bekid
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO bekid;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: bekid
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: bekid
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: bekid
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "bekid" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

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

--
-- Name: bekid; Type: DATABASE; Schema: -; Owner: bekid
--

CREATE DATABASE bekid WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE bekid OWNER TO bekid;

\connect bekid

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
-- Name: actors; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.actors (
    id character varying NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.actors OWNER TO bekid;

--
-- Name: campaign_queue; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.campaign_queue (
    id character varying NOT NULL,
    campaign_id character varying NOT NULL,
    user_id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.campaign_queue OWNER TO bekid;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.campaigns (
    id character varying NOT NULL,
    group_id character varying NOT NULL,
    user_id character varying NOT NULL,
    name character varying NOT NULL,
    expiration timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.campaigns OWNER TO bekid;

--
-- Name: emotions; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.emotions (
    id character varying NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.emotions OWNER TO bekid;

--
-- Name: group_queue; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.group_queue (
    id character varying NOT NULL,
    group_id character varying NOT NULL,
    user_id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.group_queue OWNER TO bekid;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.groups (
    id character varying NOT NULL,
    user_id character varying NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.groups OWNER TO bekid;

--
-- Name: groups_users; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.groups_users (
    group_id character varying NOT NULL,
    user_id character varying NOT NULL
);


ALTER TABLE public.groups_users OWNER TO bekid;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO bekid;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: bekid
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO bekid;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bekid
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: reasons; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.reasons (
    id character varying NOT NULL,
    emotion_id character varying NOT NULL,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reasons OWNER TO bekid;

--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO bekid;

--
-- Name: users; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.users (
    id character varying NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    avatar character varying NOT NULL,
    slug character varying NOT NULL,
    allowed boolean NOT NULL,
    activated boolean NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO bekid;

--
-- Name: votes; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.votes (
    id character varying NOT NULL,
    campaign_id character varying NOT NULL,
    emotion_id character varying NOT NULL,
    user_id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes OWNER TO bekid;

--
-- Name: votes_actors; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.votes_actors (
    id character varying NOT NULL,
    vote_id character varying NOT NULL,
    actor_id character varying NOT NULL,
    user_id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes_actors OWNER TO bekid;

--
-- Name: votes_comments; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.votes_comments (
    id character varying NOT NULL,
    vote_id character varying NOT NULL,
    user_id character varying NOT NULL,
    message character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes_comments OWNER TO bekid;

--
-- Name: votes_reasons; Type: TABLE; Schema: public; Owner: bekid
--

CREATE TABLE public.votes_reasons (
    id character varying NOT NULL,
    vote_id character varying NOT NULL,
    reason_id character varying NOT NULL,
    user_id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes_reasons OWNER TO bekid;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.actors (id, name, slug, created_at) FROM stdin;
actor_colega	Colega	colega	2021-12-29 16:38:23.861571
actor_pai	Pai	pai	2021-12-29 16:38:23.863763
actor_padastro	Padastro	padastro	2021-12-29 16:38:23.864634
actor_mae	Mae	mae	2021-12-29 16:38:23.866616
actor_tio	Tio	tio	2021-12-29 16:38:23.867748
actor_madastra	Madastra	madastra	2021-12-29 16:38:23.870105
actor_irmao_irma	Irma(o)	irmao_irma	2021-12-29 16:38:23.871248
actor_escola	Escola	escola	2021-12-29 16:38:23.873814
\.


--
-- Data for Name: campaign_queue; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.campaign_queue (id, campaign_id, user_id, created_at) FROM stdin;
campaign_queue_a_cintia	campaign_a_cintia	alex	2021-12-29 16:38:23.850229
campaign_queue_b_cintia	campaign_a_cintia	marcos	2021-12-29 16:38:23.85193
campaign_queue_c_cintia	campaign_a_cintia	simas	2021-12-29 16:38:23.85411
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.campaigns (id, group_id, user_id, name, expiration, created_at, updated_at, deleted_at) FROM stdin;
campaign_a_cintia	group_a_cintia	cintia	Primeira dinâmica em grupo	2021-12-29 16:38:23.843902	2021-12-29 16:38:23.843902	2021-12-29 16:38:23.843902	\N
campaign_b_cintia	group_a_cintia	cintia	Segunda dinâmica em grupo	2021-12-29 16:38:23.84742	2021-12-29 16:38:23.84742	2021-12-29 16:38:23.84742	\N
\.


--
-- Data for Name: emotions; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.emotions (id, name, slug, created_at) FROM stdin;
emotion_feliz	Feliz	feliz	2021-12-29 16:38:23.855184
emotion_triste	Triste	triste	2021-12-29 16:38:23.857545
emotion_raiva	Raiva	raiva	2021-12-29 16:38:23.858525
emotion_medo	Medo	medo	2021-12-29 16:38:23.860611
\.


--
-- Data for Name: group_queue; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.group_queue (id, group_id, user_id, created_at) FROM stdin;
group_queue_a	group_a_cintia	marilia	2021-12-29 16:38:23.830757
group_queue_b	group_a_cintia	franco	2021-12-29 16:38:23.83226
group_queue_c	group_a_cintia	denis	2021-12-29 16:38:23.834489
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.groups (id, user_id, name, created_at, updated_at) FROM stdin;
group_a_cintia	cintia	Turma A - Fundamental	2021-12-29 16:38:23.809267	2021-12-29 16:38:23.809267
group_b_cintia	cintia	Turma B - Fundamental	2021-12-29 16:38:23.820426	2021-12-29 16:38:23.820426
group_c_cintia	cintia	Turma C - Fundamental	2021-12-29 16:38:23.822769	2021-12-29 16:38:23.822769
group_a_camila	camila	Turma Z - Fundamental	2021-12-29 16:38:23.824861	2021-12-29 16:38:23.824861
group_b_camila	camila	Turma Y - Fundamental	2021-12-29 16:38:23.82752	2021-12-29 16:38:23.82752
group_c_camila	camila	Turma Z - Fundamental	2021-12-29 16:38:23.828555	2021-12-29 16:38:23.828555
\.


--
-- Data for Name: groups_users; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.groups_users (group_id, user_id) FROM stdin;
group_a_cintia	alex
group_a_cintia	marcos
group_a_cintia	simas
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: reasons; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.reasons (id, emotion_id, description, created_at) FROM stdin;
reason_a_triste	emotion_triste	Me bateu	2021-12-29 16:38:23.875497
reason_b_triste	emotion_triste	Me apelidou	2021-12-29 16:38:23.879539
reason_c_triste	emotion_triste	Me xingou	2021-12-29 16:38:23.880722
reason_d_triste	emotion_triste	Me machucou	2021-12-29 16:38:23.882997
reason_a_raiva	emotion_raiva	De um colega	2021-12-29 16:38:23.884001
reason_b_raiva	emotion_raiva	De um irmão	2021-12-29 16:38:23.886336
reason_c_raiva	emotion_raiva	De meus pais	2021-12-29 16:38:23.887742
reason_d_raiva	emotion_raiva	De uma pessoa	2021-12-29 16:38:23.889941
reason_e_raiva	emotion_raiva	Da escola	2021-12-29 16:38:23.891015
reason_f_raiva	emotion_raiva	Da minha casa	2021-12-29 16:38:23.893027
reason_a_medo	emotion_medo	De um colega	2021-12-29 16:38:23.89438
reason_b_medo	emotion_medo	De um irmão	2021-12-29 16:38:23.896466
reason_c_medo	emotion_medo	Dos meus pais	2021-12-29 16:38:23.897579
reason_d_medo	emotion_medo	De uma pessoa	2021-12-29 16:38:23.899828
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.users (id, name, email, password, role, avatar, slug, allowed, activated, created_at, updated_at, deleted_at) FROM stdin;
venzel	Venzel Junior	venzel@gmail.com	$2a$10$GNfzPxX/awPW6zkGneYzcO4QUNlGjAAy7Sl51r1qB1Px2prZwnOxm	ADMIN		venzel junior Venzel Junior	t	t	2021-12-29 16:38:22.618875	2021-12-29 16:38:22.618875	\N
cintia	Cíntia Almeida	cintia@gmail.com	$2a$10$/kpR/CDyGPa.fH8Z/P4VFO6skcpirj9.lLC0ppPD/.OpkcnXFTWTe	MANAGER		cintia almeida Cintia Almeida	t	t	2021-12-29 16:38:22.733492	2021-12-29 16:38:22.733492	\N
camila	Camila Porto	camila@gmail.com	$2a$10$0UIFMf/TrPiV6JUV8Fdbse53B9YYbS8RLJyso1xifJaxpWcCk7UfG	MANAGER		camila porto Camila Porto	t	t	2021-12-29 16:38:22.839435	2021-12-29 16:38:22.839435	\N
bruna	Bruna Cartilho	bruna@gmail.com	$2a$10$.iJIVLtxZFYtpQzByeQ/..Vb2OkilDMQ8Mgq13.pvE6d5iREKFnx2	MANAGER		bruna cartilho Bruna Cartilho	t	t	2021-12-29 16:38:22.944358	2021-12-29 16:38:22.944358	\N
alex	Alex Sandro	alex@gmail.com	$2a$10$UwAsK19aZv/sn0zBVov/YuTatY3p/wS0yFtiwn0.TuN.1rn/EPpKq	USER		alex sandro Alex Sandro	t	t	2021-12-29 16:38:23.050371	2021-12-29 16:38:23.050371	\N
marcos	Marcos Santos	marcos@gmail.com	$2a$10$jKYfXRC4R8XqWEvDr8E5veLrHHIyS39PoI20TI1mEDFl7ME5//voS	USER		marcos santos Marcos Santos	t	t	2021-12-29 16:38:23.155846	2021-12-29 16:38:23.155846	\N
simas	Simas Almeida	simas@gmail.com	$2a$10$b1B59k7fe1P2X4tZNacL.u3DjIAYIzV4CUy3VezVY19LWGOS3iIuC	USER		simas almeida Simas Almeida	t	t	2021-12-29 16:38:23.26101	2021-12-29 16:38:23.26101	\N
marilia	Marilia Nicacio	marilia@gmail.com	$2a$10$uD6DPHIbHgol/Dvam3tzpei/kiv1yAD.9p4NMNCCVfN6vfdzL/Dqq	USER		marilia nicacio Marilia Nicacio	t	t	2021-12-29 16:38:23.365249	2021-12-29 16:38:23.365249	\N
franco	Franco Nelio	franco@gmail.com	$2a$10$QoSnyWmseJZhgIxRB2vsPuraICA3LyWM42ANhSJK21eT0IaFMLBxe	USER		franco nelio Franco Nelio	t	t	2021-12-29 16:38:23.469365	2021-12-29 16:38:23.469365	\N
denis	Denis Simplicio	denis@gmail.com	$2a$10$re2K.Q/MSPmPD9W2uRTJoe6PeLifTqohKdUtGWeDZeqWCj2iP.55S	USER		denis simplicio Denis Simplicio	t	t	2021-12-29 16:38:23.573134	2021-12-29 16:38:23.573134	\N
vanessa	Vanessa Matos	vanessa@gmail.com	$2a$10$/z94ihE4oziSAwmLvGtHquox8ul7evMiANGoCyhKolHAaS7PtBkPS	USER		vanessa matos Vanessa Matos	t	t	2021-12-29 16:38:23.679073	2021-12-29 16:38:23.679073	\N
sergio	Sergio Neiva	sergio@gmail.com	$2a$10$N0Rhw/BSe2voGUshc65/9OfGUycrsAPltOq/eQJEJZ3Grbfe3GQPa	USER		sergio neiva Sergio Neiva	t	t	2021-12-29 16:38:23.782777	2021-12-29 16:38:23.782777	\N
\.


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.votes (id, campaign_id, emotion_id, user_id, created_at) FROM stdin;
vote_alex	campaign_a_cintia	emotion_triste	alex	2021-12-29 16:38:23.901291
vote_marcos	campaign_a_cintia	emotion_triste	marcos	2021-12-29 16:38:23.904752
vote_simas	campaign_a_cintia	emotion_triste	simas	2021-12-29 16:38:23.906054
\.


--
-- Data for Name: votes_actors; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.votes_actors (id, vote_id, actor_id, user_id, created_at) FROM stdin;
vote_actor_alex	vote_alex	actor_colega	alex	2021-12-29 16:38:23.90974
vote_actor_marcos	vote_marcos	actor_escola	marcos	2021-12-29 16:38:23.91147
vote_actor_simas	vote_simas	actor_pai	simas	2021-12-29 16:38:23.913796
\.


--
-- Data for Name: votes_comments; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.votes_comments (id, vote_id, user_id, message, created_at) FROM stdin;
vote_comment_alex	vote_alex	alex	Meu cachorro morreu!	2021-12-29 16:38:23.921321
vote_comment_marcos	vote_marcos	marcos	Estou com muita fome!	2021-12-29 16:38:23.922954
\.


--
-- Data for Name: votes_reasons; Type: TABLE DATA; Schema: public; Owner: bekid
--

COPY public.votes_reasons (id, vote_id, reason_id, user_id, created_at) FROM stdin;
vote_reason_alex	vote_alex	reason_a_triste	alex	2021-12-29 16:38:23.915116
vote_reason_marcos	vote_marcos	reason_b_triste	marcos	2021-12-29 16:38:23.917931
vote_reason_simas	vote_simas	reason_c_triste	simas	2021-12-29 16:38:23.919123
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bekid
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: emotions PK_0cfeb943349b02abbe434bf6980; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.emotions
    ADD CONSTRAINT "PK_0cfeb943349b02abbe434bf6980" PRIMARY KEY (id);


--
-- Name: groups_users PK_0dcbb207a5f954c29bfcf7a3921; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT "PK_0dcbb207a5f954c29bfcf7a3921" PRIMARY KEY (group_id, user_id);


--
-- Name: votes_comments PK_2e6cacee49661c80a34b93a87fe; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_comments
    ADD CONSTRAINT "PK_2e6cacee49661c80a34b93a87fe" PRIMARY KEY (id);


--
-- Name: group_queue PK_43c26c4eb266f8c6cc4cab2b388; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.group_queue
    ADD CONSTRAINT "PK_43c26c4eb266f8c6cc4cab2b388" PRIMARY KEY (id);


--
-- Name: groups PK_659d1483316afb28afd3a90646e; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY (id);


--
-- Name: votes_actors PK_65e506848ce2e1962f7d24e6c1d; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_actors
    ADD CONSTRAINT "PK_65e506848ce2e1962f7d24e6c1d" PRIMARY KEY (id);


--
-- Name: campaigns PK_831e3fcd4fc45b4e4c3f57a9ee4; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: votes_reasons PK_9a9a38ffd6b97deacf0c09e79eb; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_reasons
    ADD CONSTRAINT "PK_9a9a38ffd6b97deacf0c09e79eb" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: reasons PK_b8104b87e316aacce0c709000a2; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.reasons
    ADD CONSTRAINT "PK_b8104b87e316aacce0c709000a2" PRIMARY KEY (id);


--
-- Name: campaign_queue PK_d3422157b3341a05a2355f2ef36; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaign_queue
    ADD CONSTRAINT "PK_d3422157b3341a05a2355f2ef36" PRIMARY KEY (id);


--
-- Name: actors PK_d8608598c2c4f907a78de2ae461; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY (id);


--
-- Name: votes PK_f3d9fd4a0af865152c3f59db8ff; Type: CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY (id);


--
-- Name: IDX_7fff02b7fb30cd3730d90693de; Type: INDEX; Schema: public; Owner: bekid
--

CREATE INDEX "IDX_7fff02b7fb30cd3730d90693de" ON public.groups_users USING btree (user_id);


--
-- Name: IDX_d8a1834cee7d6347016e3e55f0; Type: INDEX; Schema: public; Owner: bekid
--

CREATE INDEX "IDX_d8a1834cee7d6347016e3e55f0" ON public.groups_users USING btree (group_id);


--
-- Name: reasons FK_230318999becaef45886b18c59a; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.reasons
    ADD CONSTRAINT "FK_230318999becaef45886b18c59a" FOREIGN KEY (emotion_id) REFERENCES public.emotions(id);


--
-- Name: votes FK_27be2cab62274f6876ad6a31641; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: votes_actors FK_43103570ce0cbf626f57d25027b; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_actors
    ADD CONSTRAINT "FK_43103570ce0cbf626f57d25027b" FOREIGN KEY (vote_id) REFERENCES public.votes(id);


--
-- Name: campaigns FK_45455b21195721407322ddce007; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "FK_45455b21195721407322ddce007" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: votes_reasons FK_481bcd1d5bb896e5333104d8c88; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_reasons
    ADD CONSTRAINT "FK_481bcd1d5bb896e5333104d8c88" FOREIGN KEY (reason_id) REFERENCES public.reasons(id);


--
-- Name: votes_reasons FK_52f0c9d00470193578dd10d33f0; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_reasons
    ADD CONSTRAINT "FK_52f0c9d00470193578dd10d33f0" FOREIGN KEY (vote_id) REFERENCES public.votes(id);


--
-- Name: votes_actors FK_559942c86bae234fe602d00ebdb; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_actors
    ADD CONSTRAINT "FK_559942c86bae234fe602d00ebdb" FOREIGN KEY (actor_id) REFERENCES public.actors(id);


--
-- Name: votes_reasons FK_55c380764650ad005b1c583480c; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_reasons
    ADD CONSTRAINT "FK_55c380764650ad005b1c583480c" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: campaign_queue FK_5d915c75dd0f66406f6b0119eb7; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaign_queue
    ADD CONSTRAINT "FK_5d915c75dd0f66406f6b0119eb7" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: group_queue FK_5f0c9272953cc200866207b90de; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.group_queue
    ADD CONSTRAINT "FK_5f0c9272953cc200866207b90de" FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- Name: votes_actors FK_63eca44f6f280dc5c0d8cd42e94; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_actors
    ADD CONSTRAINT "FK_63eca44f6f280dc5c0d8cd42e94" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: campaigns FK_654196f9ce0215e03a31f91927f; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT "FK_654196f9ce0215e03a31f91927f" FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- Name: votes FK_66c76f9f90fe5b0d32bb1af550e; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "FK_66c76f9f90fe5b0d32bb1af550e" FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


--
-- Name: groups_users FK_7fff02b7fb30cd3730d90693dec; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT "FK_7fff02b7fb30cd3730d90693dec" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: groups FK_9f71bda715870718997ed62f64b; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT "FK_9f71bda715870718997ed62f64b" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: campaign_queue FK_a5ba151653da8d2e7b7b17c737e; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.campaign_queue
    ADD CONSTRAINT "FK_a5ba151653da8d2e7b7b17c737e" FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


--
-- Name: votes_comments FK_a7ad167eb1bcbf29b9244825217; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_comments
    ADD CONSTRAINT "FK_a7ad167eb1bcbf29b9244825217" FOREIGN KEY (vote_id) REFERENCES public.votes(id);


--
-- Name: groups_users FK_d8a1834cee7d6347016e3e55f04; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT "FK_d8a1834cee7d6347016e3e55f04" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: group_queue FK_dce3e22a05316a8f1adda3a8bfb; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.group_queue
    ADD CONSTRAINT "FK_dce3e22a05316a8f1adda3a8bfb" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: votes_comments FK_f9a4ddda7b72fc03155445e9825; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes_comments
    ADD CONSTRAINT "FK_f9a4ddda7b72fc03155445e9825" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: votes FK_fffda520a16f50add7e323f37fb; Type: FK CONSTRAINT; Schema: public; Owner: bekid
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "FK_fffda520a16f50add7e323f37fb" FOREIGN KEY (emotion_id) REFERENCES public.emotions(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: bekid
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO bekid;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: bekid
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

