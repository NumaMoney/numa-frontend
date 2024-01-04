'use client';

import styles from './Swap.module.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.container}>
        <div className={styles.content}>
          <form className={styles.form}>
            <h3>Burn $NUMA</h3>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <span className={styles.wallet}>
              <p>
                Burning from <strong>0xfcfc...48d2</strong>
              </p>
              <a href="#">Change Wallet?</a>
            </span>
            <div className={styles.inputGroup}>
              <span className={styles.span}>
                <input type="number" placeholder="0" />
                <span className={styles.icon}>
                  <p>NUMA</p>
                </span>
              </span>
              <span className={styles.span}>
                <p>$1,822.31</p>
                <span className={styles.balance}>
                  <p>Balance: 1.249</p>
                  <button type="button" className="btn-effect">
                    Max
                  </button>
                </span>
              </span>
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.span}>
                <input type="number" placeholder="0" />
                <span className={styles.icon}>
                  <p>rETH</p>
                </span>
              </span>
              <span className={styles.span}>
                <p>$1,822.31</p>
                {/* <span className={styles.balance}>
                  <p>Balance: 1.249</p>
                  <button type="button" className="btn-effect">
                    Max
                  </button>
                </span> */}
              </span>
            </div>

            <button type="submit" className={styles.submit}>
              Burn $NUMA
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
