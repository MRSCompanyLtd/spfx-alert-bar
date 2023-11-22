import * as React from 'react';
import { IAlert } from './IAlert';
import styles from './AlertBar.module.scss';
import { ActionButton, Icon } from '@fluentui/react';

export interface IAlertsProps {
  alerts: IAlert[];
  renderDialog: (str: string) => void;
}

const Alerts: React.FC<IAlertsProps> = ({ alerts, renderDialog }) => {
  const [active, setActive] = React.useState<IAlert | null>(null);

  if (!alerts || alerts.length === 0) return null;

  React.useEffect(() => {
    if (alerts.length > 0) {
      setActive(alerts[0]);
    }
  }, [alerts]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!active) return;

      const index = alerts.indexOf(active);
      setActive(index < alerts.length - 1 ? alerts[index + 1] : alerts[0]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [active, alerts]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const alert = alerts.find((a) => a.Id.toString() === e.currentTarget.id);
      if (alert) {
        renderDialog(alert.Title);
      }
    },
    []
  );

  const nextAlert = React.useCallback(() => {
    if (!active) return;

    const index = alerts.indexOf(active);
    setActive(index < alerts.length - 1 ? alerts[index + 1] : alerts[0]);
  }, [active, alerts]);

  const prevAlert = React.useCallback(() => {
    if (!active) return;

    const index = alerts.indexOf(active);
    setActive(index > 0 ? alerts[index - 1] : alerts[alerts.length - 1]);
  }, [active, alerts]);

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        <div className={styles.title}>
          <Icon iconName='Info' aria-hidden className={styles.icon} />
        </div>
        <div style={{ display: 'flex' }}>
          {alerts.length > 1 && (
            <div className={styles.actions}>
              <ActionButton
                iconProps={{ iconName: 'ChevronUp' }}
                onClick={nextAlert}
                className={styles.button}
              />
              <ActionButton
                iconProps={{ iconName: 'ChevronDown' }}
                onClick={prevAlert}
                className={styles.button}
              />
            </div>
          )}
          {alerts.map((alert: IAlert) => (
            <div
              hidden={active?.Id !== alert.Id}
              className={`${styles.alert} ${
                active && active.Id === alert.Id ? styles.alertActive : ''
              }`}
              id={alert.Id.toString()}
              onClick={handleClick}
              key={alert.Id}
            >
              {alert.Title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
