import React from 'react';

export default function Header({ title, subtitle, rightContent }) {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.title}>{title}</h1>
        {subtitle ? <p style={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {rightContent ? <div style={styles.actionContainer}>{rightContent}</div> : null}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0ecea',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: '#1b1b1b',
  },
  subtitle: {
    margin: 0,
    marginTop: 4,
    fontSize: 14,
    color: '#6b6b6b',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
