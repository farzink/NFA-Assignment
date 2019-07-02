import React from 'react'

function RecentlyViewed({ data }) {
    const { enrolled } = data
    return (
        <section>
            {
                enrolled.map(e => e.name)
            }
        </section>
    )
}

export default RecentlyViewed;
