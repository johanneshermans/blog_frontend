import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`https://dev4-personal-blog-backend.herokuapp.com/posts`)
            .then(response => response.json())
            .then(data => setPosts(data.reverse()))
    }, []);
    return (
        <AnimateSharedLayout>
            <motion.div layout initial={{ borderRadius: 25 }}>
                {posts.map(item => (
                    <Item key={item.id} content={item} />
                ))}
            </motion.div>
        </AnimateSharedLayout>
    );
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const calculateDay = (iso) => {
    const date = new Date(`${iso}`)
    const day = date.getDate();
    return day
}

const calculateMonth = (iso) => {
    const date = new Date(`${iso}`)
    const monthNumber = date.getMonth();
    const month = monthNames[monthNumber]
    return month
}

function Item({ content }) {
    const [isOpen, setIsOpen] = useState(false);
    console.log(content);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.div layout onClick={toggleOpen}>
            <motion.section className="flex post__container" id={content.label}>
                <motion.div>
                    <motion.p className="day">{calculateDay(content.created_at)}</motion.p>
                    <motion.p className="month">{calculateMonth(content.created_at)}</motion.p>
                </motion.div>

                <motion.div className="short">
                    <motion.h2>{content.title}</motion.h2>
                    <p className="label">{content.label}</p>
                    <AnimatePresence>{isOpen && <Content text={content} />}</AnimatePresence>
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

function Content({ text }) {
    const checkImg = text.images
    console.log(checkImg)
    for (let index = 0; index < checkImg.length; index++) {
        const element = checkImg[index].name;
        console.log(element)
    }


    if (checkImg.length === 0) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    delay: 1,
                    x: { type: "spring", stiffness: 100 },
                    default: { duration: 1 },
                }}
            >
                <p className="alone">{text.message}</p>
            </motion.div>
        );
    } else {
        return (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    delay: 1,
                    x: { type: "spring", stiffness: 100 },
                    default: { duration: 1 },
                }}
            >
                <p className="alone">{text.message}</p>
                <motion.div className="images">
                    {checkImg.map((link) =>
                        <motion.img initial={{ opacity: 0 }}
                            key={link.name}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} className="image" src={link.name}></motion.img>
                    )}
                </motion.div>

            </motion.div>
        );
    }

}


