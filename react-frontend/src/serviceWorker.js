// 서비스 워커는 오프라인 경험을 제공하기 위해서 존재한다. 여기에는 푸쉬 알림, 백그라운드 동기화 등이 있다.

// 이 선택적 코드는 서비스 워커를 등록하는 데 사용됩니다.
// register()는 기본적으로 호출되지 않습니다.
// 이렇게 하면 프로덕션에서 후속 방문 시 앱이 더 빠르게 로드되고
// 오프라인 기능이 제공됩니다. 그러나 이것은 또한 개발자(및 사용자) 이전에 캐시된 리소스가 배경.
// 이 모델의 이점과 옵트인 방법에 대한 지침에 대해 자세히 알아보려면 https://bit.ly/CRA-PWA를 참조하세요.

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(
		/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	)
);

export function register(config) {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		// URL 생성자는 SW를 지원하는 모든 브라우저에서 사용할 수 있습니다.
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
		if (publicUrl.origin !== window.location.origin) {
			// PUBLIC_URL이 페이지가 제공되는 것과
			// 다른 출처에 있으면 서비스 작업자가 작동하지 않습니다.
			//  이것은 CDN이 자산을 제공하는 데 사용되는 경우에 발생할 수 있습니다. https://github.com/facebook/create-react-app/issues/2374 참조

			return;
		}

		window.addEventListener('load', () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

			if (isLocalhost) {
				// 이것은 localhost에서 실행 중입니다. 서비스 워커가 아직 존재하는지 확인해 봅시다.
				checkValidServiceWorker(swUrl, config);

				// 일부 추가 로깅을 localhost에 추가하여 개발자에게 서비스 작업자/PWA 문서를 지정합니다.
				navigator.serviceWorker.ready.then(() => {
					console.log(
						'This web app is being served cache-first by a service ' +
						'worker. To learn more, visit https://bit.ly/CRA-PWA'
					);
				});
			} else {
				// 로컬 호스트가 아닙니다. 서비스 워커를 등록하면 됩니다.
				registerValidSW(swUrl, config);
			}
		});
	}
}

function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
		registration.onupdatefound = () => {
			const installingWorker = registration.installing;

			if (installingWorker == null) {
				return;
			}
			installingWorker.onstatechange = () => {
				if (installingWorker.state === 'installed') {
					if (navigator.serviceWorker.controller) {
						// 이 시점에서 업데이트된 미리 캐시된 콘텐츠를 가져왔지만
						// 이전 서비스 작업자는 모든 클라이언트 탭이 닫힐 때까지
						// 여전히 이전 콘텐츠를 제공합니다.
						console.log(
							'New content is available and will be used when all ' +
							'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
						);

						// 콜백 실행
						if (config && config.onUpdate) {
							config.onUpdate(registration);
						}
					} else {
						// 이 시점에서 모든 것이 사전 캐시되었습니다.
						// "Content is cached for offline use."를 표시하기에 완벽한 시간입니다
						console.log('Content is cached for offline use.');

						// 콜백 실행
						if (config && config.onSuccess) {
							config.onSuccess(registration);
						}
					}
				}
			};
		};
	})
	.catch(error => {
		console.error('Error during service worker registration:', error);
	});
}

function checkValidServiceWorker(swUrl, config) {
	// 서비스 워커를 찾을 수 있는지 확인합니다. 페이지를 다시 로드할 수 없는 경우.
	fetch(swUrl)
		.then(response => {
		// 서비스 작업자가 있는지 확인하고 실제로 JS 파일을 받고 있는지 확인합니다.
		const contentType = response.headers.get('content-type');
		if (
			response.status === 404 ||
			(contentType != null && contentType.indexOf('javascript') === -1)
		) {
			// 서비스 작업자를 찾을 수 없습니다. 아마 다른 앱일 겁니다. 페이지를 새로고침하세요.
			navigator.serviceWorker.ready.then(registration => {
				registration.unregister().then(() => {
					window.location.reload();
				});
			});
		} else {
			// 서비스 작업자를 찾았습니다. 정상적으로 진행하십시오.
			registerValidSW(swUrl, config);
		}
	})

	.catch(() => {
		console.log(
			'No internet connection found. App is running in offline mode.'
		);
	});
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			registration.unregister();
		});
	}
}
