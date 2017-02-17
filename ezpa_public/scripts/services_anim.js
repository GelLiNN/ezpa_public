window.onload = function() {
    const canvas = document.getElementById('c');

    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    const ctx = canvas.getContext('2d');

    var divide = 30;
    var orbitR = 4;

    var r = window.innerWidth/divide;
    var twoPi = 2 * Math.PI;
    function t(tick) {
      tick = tick || 0;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for(var x = 0; x < divide; ++x) {
        for (var y = 0; y < divide; ++y) {
          var angle = (tick || 0) * Math.PI/180 + (x + y) / 20 * twoPi;
          ctx.strokeStyle="#ccc";
          ctx.beginPath();
          ctx.arc(r + x * r, r + y * r, r, 0, twoPi);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.arc((r + x * r) + r * Math.cos(angle) - orbitR/2, (r + y * r) + r * Math.sin(angle) - orbitR/2, orbitR, 0, 2 * Math.PI);

          ctx.fill();
        }
      }

      requestAnimationFrame(t.bind({}, (tick+1)%360));
    }

    t();
};
