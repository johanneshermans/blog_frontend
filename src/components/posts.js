import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";




/**
 * This is an example of animating shared layouts in Framer Motion 2.
 *
 * The open state of each panel is contained locally to that component. Wrapping
 * them all in the same AnimateSharedLayout component allows them all to animate
 * in response to state changes that affect each other's layout.
 *
 * Try removing AnimateSharedLayout to see how that affects the animation.
 */

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

const calculateDay = (iso) => {
    const date = new Date(`${iso}`)
    const day = date.getDate();
    return day
}

function Item({ content }) {
    const [isOpen, setIsOpen] = useState(false);
    console.log(content);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.div layout onClick={toggleOpen}>
            <motion.section className="flex post__container" id={content.label}>
                <motion.p className="day">{calculateDay(content.created_at)}</motion.p>
                <motion.div className="short">
                    <motion.h2>{content.title}</motion.h2>
                    <p className="label">{content .label}</p>
                    <AnimatePresence>{isOpen && <Content text={content} />}</AnimatePresence>
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

function Content({ text }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                delay: 1,
                x: { type: "spring", stiffness: 100 },
                default: { duration: 2 },
            }}
        >
            <p className="message">{text.message}</p>
        </motion.div>
    );
}


