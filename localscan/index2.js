// code from: https://github.com/wybiral/localscan as it were at commit: https://github.com/wybiral/localscan/commit/93236fed787da4c63ff4f5df8818d3512572484e

const thread = (start, stop, callback) => {
    const loop = port => {
        if (port < stop) {
          //http cannot be used here because Firefox will upgrade it to https and...
          //Also using https here doesn't allow depecting open port with netcat even if you reply some text before C-c
          //so it should be http and reply some text via netcat, to can detect it; but can't be http when 0.0.0.0 is used, only when 127.0.0.1 is used.
            fetch('https://0.0.0.0:' + port, {
                mode: 'no-cors'
            }).then(resp => {
                callback(port);
                loop(port + 1);
            }).catch(err => {
              console.log(err);
                loop(port + 1);
            });
        }
    };
    setTimeout(() => loop(start), 0);
};

const scanRange = (start, stop, thread_count) => {
    const port_range = stop - start;
    const thread_range = port_range / thread_count;
    for (let i = 0; i < thread_count; i++) {
        const _start = 0 | start + thread_range * i;
        const _stop = 0 | start + thread_range * (i + 1);
        thread(_start, _stop, port => {
            const el = document.createElement('div');
            el.innerText = 'Server found at :' + port;
            document.body.appendChild(el);
        });
    }
}

window.onload = () => {
    //scanRange(80, 10000, 100);
    //scanRange(80, 443, 10);
  thread(80,81, port => {
            const el = document.createElement('div');
            el.innerText = 'Server found at :' + port;
            document.body.appendChild(el);
        });
};
