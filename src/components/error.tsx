'use client'
import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <p>Terjadi Error</p>
            <button onClick={() => reset()}>Coba Ulang</button>
        </div>
    )
}
